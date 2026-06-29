# CODE_CONVENTION

프론트엔드 코드 컨벤션이다. 실제 코드 구조와 React 19 best practice, 그리고 흔한 실수를 막는 규칙을 담는다.

핵심 원칙: **쉬운 로직을 어렵게 풀지 않는다. 필요하지 않은 추상화·상태·effect를 만들지 않는다.**

## 1. 기본 원칙

- 구현 속도와 구조적 안정성을 함께 고려한다. 처음부터 과도한 아키텍처를 적용하지 않는다.
- 화면(page) / 기능(feature) / 공통 UI(shared) 책임을 분리한다.
- 서버 상태, 실시간 스트림 상태, 전역 UI 상태, 로컬 상태를 구분한다.
- 스타일·포맷은 ESLint, Prettier에 위임한다(직접 다투지 않는다).

## 2. 폴더 구조 (실제)

```text
src
├─ app          # 부트스트랩: providers, router, 세션 레이아웃, cross-feature 오케스트레이션
├─ pages        # 라우트별 화면 조합 (feature를 엮는 얇은 층)
├─ features     # 도메인 기능 슬라이스 (debate, debateSetup, transcript, issueSummary, audioCapture, mainDashboard)
├─ shared       # 도메인 무관 공통 자산
│  ├─ ui        # 디자인 시스템 컴포넌트 (Button, Modal, Toast ...)
│  ├─ api       # 공통 fetch 클라이언트 (client.ts, errors.ts, resolveApiUrl.ts)
│  ├─ store     # 전역 UI store (Zustand)
│  └─ lib       # 범용 유틸
├─ styles       # theme, GlobalStyles, mixins
└─ mocks        # MSW 핸들러 (REST + STOMP)
```

- top-level `src/api`, `src/stores`, `src/hooks`, `src/utils`는 두지 않는다. 공통은 `shared/` 아래, 기능 전용은 해당 `feature/` 아래에 둔다.
- feature 폴더 내부 표준 하위: `api/`, `hooks/`, `components/`, `lib/`, `store/`, `types/`, `constants/`. 필요한 것만 만든다.

### 2.1 feature 의존 방향 규칙

분리감을 유지하기 위해 import 방향을 제한한다.

- feature는 다음에만 의존한다: `shared/*`, 핵심 도메인 `debate`, capability `audioCapture`.
  - `debate` = 토론 세션 식별/생성을 담당하는 **핵심 도메인**. 다른 feature가 의존해도 된다.
  - `audioCapture` = 마이크/PCM을 다루는 **저수준 capability**. `transcript`, `debateSetup`이 의존해도 된다.
- 그 외 feature 간 임의의 sideways import는 금지한다.
- 여러 feature를 함께 쓰는 화면은 `pages/` 또는 `mainDashboard`(컨테이너)에서 조합한다.
- 자식 컴포넌트가 자신을 감싸는 컨테이너의 모듈을 import하지 않는다(역방향 의존 금지).

## 3. 컴포넌트 작성 규칙

- 한 컴포넌트는 하나의 명확한 역할을 가진다.
- `shared/ui` 공통 컴포넌트는 도메인/서버 의존을 직접 갖지 않는다.
- feature 컴포넌트는 공통 컴포넌트를 조합해 도메인 기능을 구현한다.
- page 컴포넌트는 화면 조합과 페이지 단위 상태 처리에 집중한다(얇게 유지).

## 4. 상태 관리 (실제 매핑)

| 종류                 | 도구                                      | 예시                         |
| -------------------- | ----------------------------------------- | ---------------------------- |
| 서버 상태 (조회)     | TanStack Query                            | 쟁점 요약 폴링               |
| 서버 호출 (비-query) | API 함수 + hook에서 호출                  | `createDebate`               |
| 전역 UI 상태         | Zustand (`shared/store`, feature `store`) | `uiStore`, `debateFlowStore` |
| 실시간 스트림 상태   | feature hook + `useReducer`               | transcript, agenda merge     |
| 로컬 UI 상태         | `useState`                                | setup funnel, 모달, 선택 탭  |
| 트리 간 공유         | React Context                             | `DebateSessionLayoutContext` |

- 서버 데이터를 전역 store에 중복 저장하지 않는다. store에는 식별자/플래그(예: `activeDebateId`)만 둔다.
- 실시간 스트림 상태는 서버 상태(TanStack Query)와 분리한다.

## 5. React 19 — useEffect 규칙 (가장 흔한 실수)

Effect는 **외부 시스템과 동기화**할 때만 쓰는 탈출구다. 그 외엔 대부분 필요 없다 (참고: React 공식 "You Might Not Need an Effect").

effect가 필요 없는 경우와 대안:

- 기존 state/props로 **계산 가능한 값** → effect+state 대신 **렌더 중 계산**.
- 비싼 계산 → `useEffect`가 아니라 `useMemo`.
- prop이 바뀔 때 컴포넌트 상태 리셋 → 다른 `key`를 넘기거나, 렌더 중 조건부 setState.
- 사용자 동작에 대한 반응 → effect가 아니라 **이벤트 핸들러**.
- 데이터 가져오기 → 가능하면 TanStack Query/`use`. effect로 할 경우 cleanup으로 경쟁 상태(race)를 막는다.

effect를 쓸 때 규칙:

- Hook은 컴포넌트/커스텀 hook **최상위에서만** 호출한다. 조건문·반복문 안에서 호출하지 않는다.
- effect 본문에서 `if/else`로 setup/teardown 경로를 나누지 않는다. 조건이 안 맞으면 **early return**으로 건너뛴다.
- cleanup은 setup과 **1:1 대칭**이어야 한다 (`subscribe`↔`unsubscribe`, `connect`↔`disconnect`).
- 관심사가 다르면(구독 / 리셋 / ref 동기화) effect를 분리한다.
- 매 렌더마다 바뀌는 객체·함수를 의존성에 넣지 않는다. effect 안으로 옮기거나 컴포넌트 밖으로 뺀다.
- 최신 prop/state를 effect 재실행 없이 읽어야 하면 `useEffectEvent`를 쓴다.

```tsx
// O: 가드 + 대칭 cleanup
useEffect(() => {
  if (!active) {
    return;
  }
  const sub = subscribe();
  return () => sub.unsubscribe();
}, [active]);

// X: 분기마다 다른 동작 + cleanup은 한 가지만
useEffect(() => {
  if (enabled) {
    start();
  } else {
    stop();
    reset();
  }
  return () => stop();
}, [enabled]);
```

## 6. React 19 — 신규 패턴

- `ref`는 일반 prop이다. 새 컴포넌트에서 `forwardRef`를 쓰지 않는다. `function Input({ ref, ...props })`처럼 직접 받는다.
- `useRef`는 초기값 인자가 필수다 (`useRef<T>(null)`).
- `element.ref` 직접 접근은 금지(경고). 필요하면 `props.ref`.
- Actions / `useActionState` / `useOptimistic` / `use`가 있으나, 이 프로젝트는 단순 패턴을 우선한다. 새 개념을 도입하기 전에 정말 필요한지 확인한다.

## 7. 과설계 방지

- 쉬운 로직을 어렵게 풀지 않는다. 영리한 한 줄보다 읽기 쉬운 여러 줄.
- 추상화/공통화는 같은 패턴이 **3번째 반복될 때** 고려한다. 미리 만들지 않는다.
- 불필요한 `useMemo`/`useCallback`/wrapper를 만들지 않는다. 실제 측정된 병목에만 적용한다.
- 한 hook은 한 가지 관심사만 담당한다.
- effect/전역 상태/추상화를 추가하기 전에 "이게 정말 필요한가?"를 먼저 자문한다.

## 8. 그 외 핵심 실수 방지 규칙

- **상태**: 파생 가능한 값은 state로 두지 않는다(렌더 중 계산). 같은 데이터를 두 곳에 중복 저장하지 않는다.
- **상태 갱신**: 불변 업데이트(스프레드/`map`/`filter`). 이전 값에 의존하면 함수형 업데이트(`setX(prev => ...)`).
- **리스트**: `key`는 안정적인 id를 쓴다. 순서가 바뀔 수 있는 목록에 index를 key로 쓰지 않는다.
- **조건/분기**: 깊은 중첩 대신 early return. 중첩 삼항 금지. boolean은 의도가 드러나는 이름.
- **비동기**: 컴포넌트에서 직접 `fetch` 금지(API 레이어 사용). 언마운트 후 setState/경쟁 상태를 cleanup이나 ignore 플래그로 막는다. 에러는 던지거나 명시적으로 처리한다.
- **타입**: `any` 지양. API 응답 타입과 UI 타입을 분리하고 필요시 mapper로 변환. 옵셔널 체이닝/기본값으로 방어.
- **함수/props**: 한 함수는 한 책임. prop drilling이 깊어지면 컴포넌트 분리 또는 Context. 매직 넘버/문자열은 상수화.
- **import**: feature 경계(§2.1)를 지킨다. 같은 폴더 안은 상대 경로, 교차 참조는 `@/` alias.

## 9. 타입 규칙

- API 요청/응답 타입을 분리한다.
- UI 표시용 타입이 필요하면 mapper를 통해 분리한다(예: `normalizeDebateResponse`).
- socket 이벤트 타입은 이벤트 종류별로 명확히 구분한다.

## 10. API 호출 규칙

- 컴포넌트에서 직접 `fetch`를 호출하지 않는다.
- 호출은 feature `api/` 함수로 분리하고, URL/method 상수는 `paths.ts`에 둔다.
- 공통 클라이언트(`shared/api/client.ts`)와 공통 에러(`ApiError`)를 사용한다.

## 11. Hook 규칙

- 재사용 로직은 hook으로 분리한다.
- feature 종속 hook은 feature 내부(`feature/hooks`)에 둔다.
- 범용 hook만 공용 위치에 둔다.

## 12. 스타일링 규칙

- Emotion(`@emotion/styled`)을 기본 스타일링 방식으로 쓴다.
- 디자인 토큰은 `src/styles/theme.ts`를 source of truth로 사용한다. 컴포넌트에서 raw hex를 직접 쓰지 않는다.
- 컴포넌트 스타일은 `*.styles.ts`에 styled component로 분리한다.
- DOM에 전달되면 안 되는 prop(variant/size 등)은 transient prop(`$variant`)을 쓴다.
- 색상/여백/radius/typography는 semantic token을 우선한다.
- 공통 스타일 fragment는 `src/styles/mixins.ts`에 둔다.
- 동적 좌표/크기/transform은 inline style을 허용한다.

### 12.1 아이콘

- SVG는 `vite-plugin-svgr`로 React 컴포넌트화한다. import는 `?react` 쿼리를 쓴다 (`import Search from "./Search.svg?react"`).
- 팀 코드에서는 배럴(`@/shared/ui/icons`) 경유 import를 기본으로 한다.
- 단색 아이콘은 `currentColor`로 두어 주변 텍스트 색(theme)을 따르게 한다. `Logo`처럼 브랜드 고정색은 예외.
- 접근성: 장식용은 `aria-hidden="true"`, 의미 전달용은 `aria-label` 또는 주변 텍스트.

## 13. 테스트 규칙

- 테스트 파일은 대상 파일 근처(co-located)에 둔다(`target.test.ts`).
- 순수 함수/lib는 단위 테스트로 입력→출력을 검증한다.
- 사용자 관찰 가능한 결과 중심으로 검증한다.
- 외부 API/네트워크는 MSW 기반 mock을 사용한다.

## 14. 도메인 용어집 (코드/UI 일관 사용)

| 도메인             | 코드 식별자         | 비고                            |
| ------------------ | ------------------- | ------------------------------- |
| 음성               | `audio`             | Web Audio/PCM/Worklet 기술 계층 |
| 주제               | `topic`             | 토론 주제                       |
| 쟁점               | `agenda`            | 논점                            |
| 주장               | `claim`             | 백엔드 스키마와 일치            |
| 근거               | `evidence`          |                                 |
| partial/final 발화 | `partial` / `final` | STT 미확정/확정                 |

- `topic` 혼동 주의: 도메인 `topic`(주제)와 STOMP 브로커 `topic`(`/topic/...` destination)은 다르다. **JS 식별자에서는 "topic"을 주제 전용으로 쓰고**, STOMP 관련 식별자는 `channel`/`destination` 계열로 명명한다. STOMP 경로 문자열(`/topic/debate/{id}`)은 브로커 관례이므로 그대로 둔다.

## 15. 파일·폴더 네이밍

`src` 아래 소스 파일은 역할에 따라 케이스를 구분한다. kebab-case(`toast-context.ts`, `use-modal-effects.ts`)는 **사용하지 않는다**.

### 15.1 소스 파일 (`src/**`)

| 대상                        | 케이스                  | 확장자         | 예시                                                      |
| --------------------------- | ----------------------- | -------------- | --------------------------------------------------------- |
| React 컴포넌트              | PascalCase              | `.tsx`         | `Button.tsx`, `ToastProvider.tsx`                         |
| Hook                        | camelCase, `use` 접두사 | `.ts` / `.tsx` | `useToast.ts`, `useModalEffects.ts`                       |
| Context + 전용 hook (한 쌍) | camelCase               | `.ts`          | `useModalContext.ts` (createContext와 hook을 같은 파일에) |
| 컴포넌트 묶음의 타입·상수   | §15.2                   | `.ts`          | `Toast.types.ts`, `constants.ts`                          |
| 유틸·순수 함수              | camelCase               | `.ts`          | `formatDuration.ts`                                       |
| 배럴 export                 | `index`                 | `.ts`          | `index.ts`                                                |
| Storybook                   | 컴포넌트명 + `.stories` | `.tsx`         | `Button.stories.tsx`                                      |
| 테스트                      | 대상명 + `.test`        | `.ts` / `.tsx` | `useToast.test.ts`                                        |

### 15.2 컴포넌트 폴더 안의 타입·상수 파일

`toast/`, `modal/`처럼 묶음 폴더가 있으면 파일명에 폴더명을 다시 붙이지 않는다(`toast.constants.ts` X).

1. 역할만 — 폴더가 네임스페이스 (`types.ts`, `constants.ts`)
2. PascalCase 엔티티 + dot suffix — 대표 이름이 분명할 때 (`Toast.types.ts`)
3. camelCase 단일 모듈 — 컴포넌트 폴더 밖 (`shared/lib`, `api`)

### 15.3 폴더

- pages / features 슬라이스: camelCase (`pages/mainDashboard/`, `features/debateSetup/`).
- URL path가 kebab(`/debates/:id`)이어도 폴더명과 맞출 필요는 없다. kebab은 경로 문자열·nav id 등에만 둔다.
- shared/ui 묶음: 단어 하나면 소문자(`button/`), 여러 단어면 camelCase(`quoteBox/`).

### 15.4 사람이 작성한 듯한 네이밍

- 변수/함수/파일명은 자연스럽고 간결하게. 의도가 드러나는 도메인 어휘를 쓴다.
- AI 티 나는 과장·장황·기계적 이름을 피한다: `handleButtonClickEvent`, `dataResult`, `tempValue`, 불필요한 `Manager`/`Helper`/`Util` 접미사, 과한 접두사.
- 줄임말은 통용되는 것만(`id`, `url`, `stt`, `pcm`).
- 파일명과 export 이름을 맞춘다(`Toast.tsx` → `export function Toast`).

### 15.5 기존 코드

- kebab-case로 남아 있는 파일은 수정할 때 PascalCase/camelCase로 맞춘다.
- 한 PR에서 대규모 일괄 rename은 팀과 합의 후 진행한다.

## 관련 문서

- [요구사항](../product/REQUIREMENTS.md)
- [아키텍처](../ARCHITECTURE.md)
- [에이전트 작업 방식](../AGENT_WORKFLOW.md)
- [프로젝트 진입점 README](../../README.md)
