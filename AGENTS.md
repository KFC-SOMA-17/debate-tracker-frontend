# AGENTS.md

이 문서는 이 저장소에서 AI 에이전트(Claude Code, Cursor 등 도구 무관)와 사람이 따르는 **단일 source of truth 허브**다. 프로젝트 맥락, 가드레일, 그리고 "어떤 작업에 어떤 문서를 읽어야 하는지"를 정의한다.

특정 IDE 기능에 의존하지 않는다. 표준 절차는 [docs/AGENT_WORKFLOW.md](docs/AGENT_WORKFLOW.md)를 따른다.

## 프로젝트 맥락

- STT 기반 토론 실시간 속기록·요약·분석 웹 서비스의 **프론트엔드**다.
- 핵심 흐름: `토론 시작 → 실시간 속기록 → 쟁점 요약 → 주장 트리 → 사후 분석`.
- 이 프론트엔드는 **백엔드 개발자가 서비스를 실험·탐구하기 위한 최소 장치**다. 픽셀 단위 디자인, 고성능 최적화, 촘촘한 예외 처리는 목표가 아니다.

## 작업 시작 전에 (필수)

1. 관련 문서를 먼저 읽는다 (아래 Document Routing 참고).
2. 현재 범위를 확인하고, 요구가 모호하면 범위를 넓히지 말고 최소 구현을 택한다.
3. 기존 공통 컴포넌트·패턴을 우선 재사용한다.
4. 변경 후 `pnpm typecheck && pnpm lint && pnpm test:run`로 자가 검증한다.

전체 절차는 [docs/AGENT_WORKFLOW.md](docs/AGENT_WORKFLOW.md)에 있다.

## Document Routing (무엇을 판단할 때 무엇을 읽나)

| 판단할 것 | 읽을 문서 |
| --- | --- |
| 기능 범위·화면·핵심 흐름 | [docs/product/REQUIREMENTS.md](docs/product/REQUIREMENTS.md) |
| 코드 구조·컨벤션·React 규칙·용어집·네이밍 | [docs/frontend/CODE_CONVENTION.md](docs/frontend/CODE_CONVENTION.md) |
| 레이어·데이터 흐름·알려진 복잡도 | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| 에이전트 표준 작업 절차 | [docs/AGENT_WORKFLOW.md](docs/AGENT_WORKFLOW.md) |
| 브랜치·커밋·PR 규칙 | [docs/GIT_CONVENTION.md](docs/GIT_CONVENTION.md) |
| 음성 입력·PCM 전처리 | [docs/product/CLIENT_AUDIO_CAPTURE.md](docs/product/CLIENT_AUDIO_CAPTURE.md) |
| 환경 설정·실행 | [README.md](README.md) |

문서 간 충돌 시 더 구체적인 문서를 우선한다. 구현 판단이 필요하면 범위를 넓히지 말고 현재 문서 기준 최소 구현으로 결정한다.

## 범위 (Scope)

- In Scope: 진입 플로우(랜딩/준비), 토론 시작·종료, 실시간 속기록, 쟁점별 요약, split layout(resize/collapse), 마인드맵 주장 트리, 팀별/개인별 분석.
- Out of Scope: 모바일 최적화, 계정/권한 고도화, 실시간 승리 확률, 개인 발화 통계, 논리적 오류 탐지 고도화, SNS 연동.
- Deferred: 분석 기반 산출물 생성(카드뉴스, 세특 참고 초안) — 후속 Sprint.

## 제품 가드레일

- 토론 중에는 메인 대시보드만 활성화한다. 팀별/개인별 분석은 토론 종료 후 활성화한다.
- 메인 대시보드에 승패·점수·우세 판정·실시간 승리 확률을 표시하지 않는다. 객관적 기록과 구조화 정보에 집중한다.
- 실시간 속기록과 쟁점 요약은 split layout으로 함께 보여준다. threshold를 넘기면 한쪽 패널을 collapse할 수 있다.

## 프론트엔드 가드레일

- 페이지 컴포넌트는 화면 조합에 집중하고, 복잡한 도메인 로직은 feature 내부로 분리한다.
- 공통 컴포넌트(`shared/ui`)는 도메인 로직을 포함하지 않는다.
- 서버 상태는 TanStack Query, 전역 UI 상태는 Zustand, 실시간 스트림 상태는 feature hook으로 분리한다.
- feature 의존 방향 규칙을 지킨다(CODE_CONVENTION §2.1).
- 자세한 규칙은 [CODE_CONVENTION.md](docs/frontend/CODE_CONVENTION.md).

## 실시간 데이터 규칙

- STT `partial`/`final`을 구분한다. partial은 생성 중 발화, final 수신 시 확정 목록으로 전환, 중복 표시 금지.
- 중복·지연 이벤트, 연결 해제·재연결을 고려한다.
- WebSocket/STOMP 연결 문제는 Suspense가 아니라 연결 상태 UI로 처리한다.

## 에러 처리 (가볍게)

- REST와 Socket 이벤트는 공통 error 객체(`ApiError`: code/status/message)를 공유한다.
- 복구 가능한 에러는 패널/액션 단위, 복구 불가능한 에러는 페이지 단위로 처리한다.
- 이 프로젝트는 최소 장치이므로 과도하게 촘촘한 예외 분기는 만들지 않는다.

## 디자인 규칙 (가볍게)

- 디자인 토큰(`src/styles/theme.ts`)을 우선 사용하고, 컴포넌트에서 raw hex를 직접 쓰지 않는다.
- 과한 장식보다 읽기 쉬운 구조와 일관된 공통 컴포넌트 사용을 우선한다.

## 하지 말 것

- 현재 Sprint/범위를 벗어난 기능을 임의로 추가하지 않는다.
- 불필요한 대규모 리팩터링·추상화를 만들지 않는다(과설계 방지: CODE_CONVENTION §7).
- 쉬운 로직을 어렵게 풀지 않는다.
