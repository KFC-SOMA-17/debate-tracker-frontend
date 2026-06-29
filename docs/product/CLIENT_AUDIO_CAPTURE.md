# 클라이언트 음성 입력 및 전처리

## 문서 정보

| 항목 | 내용 |
| --- | --- |
| 문서명 | 클라이언트 음성 입력 및 전처리 |
| 관련 요구사항 | [REQUIREMENTS.md](./REQUIREMENTS.md) §3.2 하드웨어 인터페이스, §4.2 실시간 속기록 |
| 구현 위치 | `src/features/audioCapture/` |
| 참고 (MDN) | [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), [Using the Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API), [Basic concepts behind Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Basic_concepts_behind_Web_Audio_API) |

---

## 1. 목적

디베이트 트래커는 토론 중 사용자의 **마이크 음성**을 브라우저에서 받아, STT(Speech-to-Text) API가 처리하기 쉬운 형태로 **전처리**한 뒤 서버로 전송한다. 서버는 수신한 오디오를 STT(예: Microsoft Azure Speech)에 넘겨 텍스트를 만들고, 그 결과를 WebSocket 등으로 클라이언트에 되돌려 **실시간 속기록**에 표시한다.

본 문서는 다음을 설명한다.

- 브라우저 **Web Audio API** 기반 처리 흐름 (MDN 개념 정리)
- **PCM16**, **다운샘플링**, **최소 노이즈 억제**, **chunk 단위 전송**을 왜 쓰는지

구현 세부(파일명, 상수값)는 코드와 [AGENTS.md](../../AGENTS.md)의 실시간 데이터 규칙을 따른다.

---

## 2. 전체 데이터 흐름

```text
[마이크] → getUserMedia (MediaStream)
         → AudioContext + 오디오 그래프 (필터·Worklet)
         → 다운샘플링 · PCM16 인코딩 · 200ms chunk 누적
         → (향후) WebSocket binary 전송
         → [서버] STT API → partial/final 텍스트
         → [클라이언트] 실시간 속기록 UI
```

현재 MVP 단계에서는 **chunk 생성·전처리까지**를 클라이언트에서 검증하고, 서버 전송은 API 확정 후 `onChunk` 콜백에 연동한다.

---

## 3. Web Audio API 동작 과정 (MDN 기준)

[MDN Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)는 웹에서 오디오를 **모듈형 그래프**로 처리하는 API다. 핵심 개념은 다음과 같다.

### 3.1 AudioContext

- 모든 Web Audio 처리는 **`AudioContext`** 안에서 이루어진다.
- 컨텍스트를 만든 뒤, 소스·효과·목적지를 **AudioNode**로 연결해 **라우팅 그래프**를 구성한다.
- MDN의 일반적인 워크플로: 컨텍스트 생성 → 소스 생성 → 효과 노드 생성 → 목적지 연결 → 소스–효과–목적지 연결.

참고: [Using the Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API)

### 3.2 AudioNode와 샘플 스트림

- **AudioNode**는 오디오 처리 단위(소스, 필터, 게인, 목적지 등)이다.
- 소스 노드는 **시간에 따른 진폭(amplitude) 샘플 배열**을보낸다. MDN은 이를 “초당 수만 개”의 측정값으로 설명한다.
- 노드의 **출력을 다른 노드의 입력에 연결**하면, 여러 스트림이 섞이거나 변형된다.

참고: [Basic concepts behind Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Basic_concepts_behind_Web_Audio_API) — 디지털 오디오, 샘플, 샘플 레이트

### 3.3 디베이트 트래커에서의 그래프

본 프로젝트는 **스피커로 재생하지 않고**, STT용으로 샘플만 추출한다. 그래프는 대략 다음과 같다.

```text
MediaStreamAudioSourceNode  ← getUserMedia()로 얻은 마이크 MediaStream
        ↓
BiquadFilterNode (high-pass)  ← 저역 럼블·잡음 일부 제거
        ↓
AudioWorkletNode            ← 실시간 프레임을 메인 스레드로 전달
        ↓
(메인 스레드) 다운샘플 · PCM16 · chunk 누적
```

| 단계 | API (MDN) | 역할 |
| --- | --- | --- |
| 마이크 입력 | [MediaDevices.getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) | 사용자 권한 후 `MediaStream` 획득 |
| 스트림 연결 | [MediaStreamAudioSourceNode](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamAudioSourceNode) | `MediaStream`을 오디오 그래프 소스로 사용 |
| 필터 | [BiquadFilterNode](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode) | high-pass 등 효과 적용 |
| 저지연 처리 | [AudioWorklet](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet) / [AudioWorkletNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode) | 별도 오디오 스레드에서 `process()` 호출, 메인 스레드와 `MessagePort`로 통신 |

**MediaRecorder를 쓰지 않는 이유:** `MediaRecorder`는 WebM/Opus 등 **이미 압축·컨테이너화된 데이터**를 만든다. STT 입력으로 흔히 쓰는 **고정 샘플레이트·고정 길이의 raw PCM chunk**를 주기적으로 만들기 어렵고, 서버에서 디코딩 단계가 추가된다. 따라서 **Web Audio로 샘플 단위 파이프라인**을 구성한다.

### 3.4 AudioWorklet이 필요한 이유

과거에는 [ScriptProcessorNode](https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode)로 메인 스레드에서 샘플을 처리했으나, MDN은 **성능 문제로 deprecated**라고 명시한다.

[AudioWorklet](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet)은 **별도 오디오 스레드**에서 `AudioWorkletProcessor` 코드를 실행해 **낮은 지연**으로 처리한다. 커스텀 분석·전처리에 적합하다.

참고: [Background audio processing using AudioWorklet](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_AudioWorklet)

### 3.5 getUserMedia와 보안

- [getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)는 **HTTPS(또는 localhost)** 같은 [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts)에서만 사용 가능하다.
- 사용자 **명시적 권한**이 필요하며, 거부 시 `NotAllowedError`, 장치 없음 시 `NotFoundError` 등이 발생한다.
- 요구사항상 마이크 실패·권한 거부 시 사용자에게 상태를 안내해야 한다 ([REQUIREMENTS.md](./REQUIREMENTS.md) §3.2).

---

## 4. PCM16이란 무엇인가

### 4.1 디지털 오디오 샘플

아날로그 음성은 **일정 시간 간격으로 진폭을 숫자로 저장**한 **샘플** 열로 표현한다. **샘플 레이트(sample rate)** 는 초당 샘플 개수다 (예: 48,000Hz → 1초에 48,000개).

MDN: 소스 노드가 “successive moments in time”의 amplitude 배열을 제공한다고 설명한다. ([Web Audio API 개요](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API))

### 4.2 PCM과 PCM16

- **PCM(Pulse-Code Modulation)**: 샘플을 **선형(또는 균일) 간격**으로 양자화해 저장하는 방식. “원시에 가까운” 오디오 데이터로, 대부분의 STT·음성 인코더 입력에 적합하다.
- **PCM16**: 샘플 하나당 **16비트 부호 있는 정수**로 표현 (일반적으로 **little-endian**). 값 범위는 대략 -32,768 ~ 32,767이며, float -1.0 ~ 1.0과 대응시켜 인코딩한다.

### 4.3 왜 PCM16을 쓰는가

- **Microsoft Azure Speech**를 비롯한 클라우드 STT는 **16kHz, mono, 16-bit PCM** 조합을 자주 지원한다.
- 바이너리 크기가 float32보다 작아 **네트워크 chunk 전송**에 유리하다.
- 서버·STT SDK가 기대하는 **바이트 스트림 형식**과 맞추기 쉽다.

본 프로젝트 기본값:

| 항목 | 값 |
| --- | --- |
| 샘플 레이트 | 16,000 Hz |
| 채널 | mono (1) |
| 인코딩 | signed 16-bit LE |
| chunk 길이 | 200 ms |
| chunk당 바이트 | 16,000 × 0.2 × 2 = **6,400 bytes** |

상수는 `src/features/audioCapture/constants/audioProcessing.ts`에 정의한다.

---

## 5. 다운샘플링의 목적

### 5.1 문제: 브라우저 샘플 레이트 ≠ STT 샘플 레이트

`AudioContext`의 [sampleRate](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/sampleRate)는 브라우저·OS에 따라 **48,000Hz** 등이 흔하다. STT는 **16,000Hz** 입력을 기대하는 경우가 많다.

같은 200ms 구간이라도:

- 48kHz → 9,600 샘플
- 16kHz → 3,200 샘플

STT에 맞추려면 **샘플 개수를 줄이는 리샘플링(다운샘플링)** 이 필요하다.

### 5.2 목적 정리

| 목적 | 설명 |
| --- | --- |
| STT 호환 | API가 요구하는 샘플 레이트에 맞춤 |
| 대역폭 절감 | 초당 샘플 수 감소 → chunk 바이트 수 감소 |
| 일관된 chunk 크기 | 서버·STT 파이프라인이 **고정 길이 프레임**을 처리하기 쉬움 |

### 5.3 구현 시 유의점 (개념)

단순히 N개마다 샘플을 버리는 **decimation**만 하면 **에일리어싱(고주파가 저주파로 겹쳐 보이는 현상)** 이 생길 수 있다. 그래서 다운샘플 전 **저역 통과(간단한 평균·필터)** 를 함께 적용하는 것이 일반적이다.

본 프로젝트 구현(`src/features/audioCapture/lib/downsample.ts`)은 **`DownsampleStream`**으로 Worklet 프레임 경계를 이어, 출력 샘플마다 입력 구간 **boxcar 평균**(예: 48kHz→16kHz면 3샘플 평균)으로 16kHz에 맞춘다. FIR·sinc급 고품질 리샘플은 아니나, STT용 **에일리어싱 완화·샘플 정렬**에 충분한 수준을 목표로 한다.

### 5.4 의사 결정: `OfflineAudioContext` 미사용

| 항목 | 내용 |
| --- | --- |
| **검토한 대안** | [OfflineAudioContext](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext)로 `sampleRate: 16000` 컨텍스트를 만들고, 버퍼·그래프를 **한 번 렌더**해 브라우저 내장 리샘플링에 맡기는 방식 |
| **적합한 경우** | 이미 확보된 `AudioBuffer`·파일을 **배치로** 변환할 때 (미리듣기 파일, 오프라인 검증 등) |
| **기각 이유 (실시간 마이크)** | (1) 매 Worklet 프레임마다 오프라인 렌더를 돌리면 **CPU·지연**이 커짐 (2) 스트리밍 chunk(200ms) 타이밍과 맞추기 어려움 (3) 실시간 파이프라인 목적과 API 설계(일괄 `startRendering`)가 다름 |
| **현재 선택** | 라이브 `AudioContext` + `AudioWorklet`로 샘플 탭 → 메인 스레드 `DownsampleStream` → `ChunkAccumulator` |
| **재검토 시점** | STT 인식률이 리샘플 품질에 민감하다고 확인될 때 — worklet 내부 다운샘플, 윈도우 평균 decimation, WASM 리샘플러 등 **실시간 경로**에서 개선 (오프라인 컨텍스트로 실시간 chunk를 대체하지는 않음) |

---

## 6. 최소한의 노이즈 억제

“화이트 노이즈 제거”를 **방송/신호처리 수준의 스펙트럼 제거**까지 MVP에서 요구하지 않는다. Early 단계에서는 **비용 대비 효과가 큰 최소 조합**을 쓴다.

### 6.1 브라우저 `getUserMedia` 제약 (1차)

[MediaTrackConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints)를 통해 브라우저·OS가 제공하는 처리를 켠다.

| constraint | 목적 |
| --- | --- |
| `noiseSuppression: true` | 브라우저 내장 노이즈 억제 |
| `echoCancellation: true` | 울림·하울링 감소 |
| `autoGainControl: true` | 입력 레벨 자동 조절 |
| `channelCount: 1` | mono 스트림 |

이는 **별도 라이브러리 없이** 마이크 단계에서 잡음·에코를 줄이는 1차 방어다.

### 6.2 Web Audio high-pass 필터 (2차)

[BiquadFilterNode](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode)의 `highpass` 타입으로 **매우 낮은 주파수(예: 100Hz 이하)** 를 줄인다.

| 효과 | 한계 |
| --- | --- |
| 테이블 진동, HVAC 럼블, DC에 가까운 저역 성분 완화 | 광대역 “쉬쉬” 하는 화이트 노이즈 전용 제거는 아님 |

### 6.3 MVP에서 다루지 않는 것

- RNNoise, Speex 등 **WASM 기반 고급 억제** — 번들·지연·튜닝 비용 대비 후속 이슈로 분리
- **노이즈 게이트**(무음 구간 mute) — 필요 시 상수로 on/off 가능하나, 기본 완료 기준에는 browser + high-pass까지

진짜 **화이트 노이즈**는 스펙트럼 빼기·딥러닝 모델 영역에 가깝고, STT 품질은 **마이크 품질·환경·STT 엔진 자체 노이즈 내성**에도 크게 의존한다 ([REQUIREMENTS.md](./REQUIREMENTS.md) §2.3 제약).

---

## 7. 200ms chunk 단위 전송

### 7.1 chunk란

연속적인 PCM 스트림을 **고정 시간(또는 고정 샘플 수) 단위로 잘라** 네트워크로 보내는 조각이다.

- **200ms**마다 한 번 전송하면, 초당 약 5개의 패킷
- 각 패킷 payload: **6,400 bytes** (16kHz × 0.2s × 2 bytes)

### 7.2 왜 나누는가

| 이유 | 설명 |
| --- | --- |
| 실시간 STT | 스트리밍 STT는 **짧은 구간 단위**로 인식·partial 결과를 갱신 |
| 지연·버퍼 | 너무 길면 첫 글자까지 지연 증가, 너무 짧으면 오버헤드 증가 — 100~300ms 대역이 흔함 |
| 장애 복구 | 구간 단위로 재전송·순서 관리하기 쉬움 |

chunk 길이 `CHUNK_DURATION_MS`는 상수로 두어 **나중에 100ms·250ms 등으로 조정**할 수 있다.

### 7.3 메타데이터 (향후 WebSocket)

API 확정 전에도 클라이언트는 chunk마다 다음을 함께 다룰 수 있다.

- `sequence` — 순번
- `byteLength` — 검증용
- `sampleRate` — 16,000
- `rms` — 입력 레벨(디버그·무음 감지 참고)
- `elapsedSincePreviousMs` — 실제 간격 모니터링 (~200ms 기대)

---

## 8. 디베이트 트래커 처리 순서 (요약)

다음은 MDN 개념과 본 프로젝트 구현을 1:1로 맞춘 순서다.

1. **권한·스트림** — `navigator.mediaDevices.getUserMedia({ audio: constraints })` → `MediaStream`
2. **컨텍스트** — `new AudioContext()` → `resume()` (사용자 제스처 이후 재생/처리 가능 상태)
3. **소스** — `createMediaStreamSource(stream)`
4. **노이즈 억제(최소)** — `BiquadFilterNode` high-pass + getUserMedia `noiseSuppression` 등
5. **프레임 추출** — `AudioWorkletNode` / `AudioWorkletProcessor.process()` → `port.postMessage(Float32Array)`
6. **다운샘플** — 48kHz(등) → 16kHz
7. **PCM16** — float 샘플 → Int16Array
8. **누적·분할** — 3,200샘플(200ms)마다 `ArrayBuffer` chunk 생성
9. **(향후)** WebSocket `send(ArrayBuffer)`
10. **(서버)** STT → partial/final 텍스트 → 클라이언트 속기록

---

## 9. 관련 용어 (제품 문서 연계)

| 용어 | 본 문서/구현에서의 의미 |
| --- | --- |
| STT | 서버(또는 클라우드 API)에서 PCM chunk를 텍스트로 변환 |
| Partial 발화 | STT가 아직 확정하지 않은 중간 인식 결과 |
| Final 발화 | STT가 확정한 발화 |
| 실시간 속기록 | partial/final 텍스트를 UI에 표시 ([REQUIREMENTS.md](./REQUIREMENTS.md)) |

---

## 10. 참고 링크 (MDN)

| 주제 | URL |
| --- | --- |
| Web Audio API | https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API |
| Basic concepts | https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Basic_concepts_behind_Web_Audio_API |
| Using Web Audio API | https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API |
| getUserMedia | https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia |
| MediaStreamAudioSourceNode | https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamAudioSourceNode |
| BiquadFilterNode | https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode |
| AudioWorklet | https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet |
| AudioWorkletNode | https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode |
| Using AudioWorklet | https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_AudioWorklet |

---

## 11. 캡처 제어 (STT 연동)

`useAudioCapture` 훅이 토론 STT 연동 시 사용할 캡처 제어 API를 제공한다.

### 11.1 일시정지/재개

- `MediaStreamTrack.enabled = false`로 마이크 입력을 끊고, chunk 생성을 중단한다.
- **재개** 시 트랙을 다시 켜고 누적 버퍼를 비운다 (권한 재요청 없음).
- `pauseCapture` / `resumeCapture`로 제어한다.

### 11.2 noiseSuppression

- getUserMedia `noiseSuppression` constraint로 브라우저 1차 잡음 억제를 적용한다.
- `setNoiseSuppressionEnabled`로 ON/OFF 전환 시 마이크 스트림을 재시작한다.

---

## 12. 변경 이력

| 버전 | 날짜 | 내용 |
| --- | --- | --- |
| v0.5 | 2026-06-04 | 다운샘플 — 구간 평균(boxcar) + `DownsampleStream` 프레임 경계 연속 처리 |
| v0.4 | 2026-06-04 | 다운샘플링 — `OfflineAudioContext` 미사용 의사 결정(§5.4), 구현 한계 명시(§5.3) |
| v0.3 | 2026-06-04 | STT 연동용 `useAudioCapture` 정리 — 테스트 UI 문서 제거 |
| v0.2 | 2026-06-02 | 일시정지, 노이즈 억제 제어 |
| v0.1 | 2026-06-02 | 초안 — Web Audio 흐름, PCM16, 다운샘플링, 노이즈 억제, chunk 개념 정리 |
