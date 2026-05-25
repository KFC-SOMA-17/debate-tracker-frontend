# AGENTS.md

## Project Context

- 이 프로젝트는 STT 기반 토론 실시간 속기록·요약·분석 웹 서비스의 프론트엔드다.
- 핵심 흐름은 `토론 시작 → 실시간 속기록 → 쟁점 요약 → 주장 트리 → 사후 분석 → 산출물 생성`이다.
- Early MVP의 1차 목표는 토론 중 발화를 실시간으로 기록하고, 쟁점·주장·근거를 구조화해 사용자가 토론 흐름을 놓치지 않도록 돕는 것이다.
- 사후 분석은 토론 종료 후 팀별/개인별 피드백 리포트를 제공하는 방향으로 구현한다.

## Current Scope

### In Scope

- Main Dashboard
  - 토론 시작 전 상태
  - 토론 시작/종료 기본 흐름
  - 실시간 속기록
  - 쟁점별 요약
  - split layout resize/collapse
  - 마인드맵 주장 트리

- Team Analysis
  - 팀별 종합 피드백
  - 팀별 설득력 평가
  - 쟁점별 우세 판정
  - 관련 발화 확인

- Personal Analysis
  - 발화자 탭
  - 개인 종합 평가
  - 발언별 피드백
  - PDF 리포트 추출

### Out of Scope for Early MVP

- 모바일 최적화
- 사용자 계정/권한 관리 고도화
- 동아리별 워크스페이스
- 실시간 승리 확률
- 개인 발화 통계
- 논리적 오류 탐지 고도화
- 팀별 근거 유형 분포
- 카드뉴스 이미지 편집 고도화
- SNS 게시 연동

### Deferred Scope

- 분석 결과 기반 산출물 생성
- 세특 참고 초안
- 카드뉴스 생성 또는 editable 카드뉴스 에디터
- 위 항목은 Sprint 5~6 이후 구현 대상으로 본다.

## Product Guardrails

- 토론 중에는 `Main Dashboard`만 활성화한다.
- `Team Analysis`, `Personal Analysis`는 토론 종료 후 활성화한다.
- 메인 대시보드에는 승패 판단, 점수, 우세 판정, 실시간 승리 확률을 표시하지 않는다.
- 메인 대시보드는 객관적인 기록과 구조화 정보 제공에 집중한다.
- 실시간 속기록과 쟁점 요약은 split layout으로 함께 보여준다.
- 사용자는 split bar를 통해 패널 크기를 조절하고 threshold를 넘기면 한쪽 패널을 collapse할 수 있다.

## Frontend Guardrails

- 페이지 컴포넌트는 화면 조합에 집중한다.
- 복잡한 도메인 로직은 feature 내부로 분리한다.
- 공통 컴포넌트는 도메인 로직을 포함하지 않는다.
- 기능 컴포넌트는 공통 컴포넌트를 조합해 도메인별 UI와 로직을 구현한다.
- 서버 상태는 TanStack Query로 관리한다.
- UI 전역 상태는 Zustand로 관리한다.
- 컴포넌트 내부에서만 필요한 상태는 로컬 상태로 관리한다.
- 실시간 스트림 상태는 서버 상태와 분리한다.
- API 요청/응답 타입과 UI 타입은 필요에 따라 분리한다.
- Socket 이벤트는 이벤트 타입별로 명확히 구분한다.

## Real-time Data Rules

- STT partial 발화와 final 발화는 구분해서 처리한다.
- partial 발화는 현재 생성 중인 발화로 표시한다.
- final 발화 수신 시 확정 발화 목록으로 전환한다.
- 같은 발화가 partial/final로 중복 표시되지 않도록 한다.
- 중복 이벤트, 늦게 도착한 이벤트, 연결 해제, 재연결 상황을 고려한다.
- WebSocket/STOMP 연결 문제는 Suspense보다 연결 상태 UI로 처리한다.

## Error Handling Rules

- REST API와 Socket 이벤트는 공통 error 객체 규격을 공유한다.
- 프론트엔드는 error code와 recoverable 여부를 기준으로 UI를 분기한다.
- 복구 가능한 에러는 패널 또는 액션 단위로 처리한다.
- 복구 불가능한 에러는 페이지 단위 fallback으로 처리한다.
- 사용자 액션 기반 에러는 해당 버튼, 모달, 폼 안에서 처리한다.

## Design Rules

- TypeUI Clean 테마를 기본 디자인 방향으로 따른다.
- 색상, 타이포그래피, spacing, radius는 디자인 토큰을 우선 사용한다.
- 컴포넌트 내부에서 raw hex color를 직접 사용하지 않는다.
- 과한 장식보다 읽기 쉬운 구조와 일관된 컴포넌트 사용을 우선한다.

## Agent Working Rules

- 작업 전에 관련 문서를 먼저 확인한다.
- 현재 Sprint 범위를 벗어난 기능을 임의로 추가하지 않는다.
- 요구사항이 불명확하면 범위를 넓히지 말고 현재 문서 기준의 최소 구현을 우선한다.
- 기존 공통 컴포넌트와 기존 패턴이 있으면 우선 재사용한다.
- 새 컴포넌트를 만들기 전에 공통화 대상인지 feature 전용인지 먼저 판단한다.
- API가 준비되지 않은 경우 mock 데이터 기반으로 먼저 구현할 수 있다.
- mock 구현은 이후 실제 API로 교체하기 쉬운 구조로 유지한다.
- 불필요한 대규모 리팩터링이나 추상화는 피한다.
- 상세 스펙이 필요한 경우 아래 Reference Documents를 source of truth로 따른다.

## Document Usage

- 기능 범위와 우선순위 판단: `docs/product/REQUIREMENTS.md`
- 화면 구조와 상태별 동작 판단: `docs/product/SCREEN_SPEC.md`
- 코드 구조와 구현 컨벤션 판단: `docs/frontend/CONVENTIONS.md`
- 에러 처리 방식 판단: `docs/frontend/ERROR_POLICY.md`
- UI 원칙, 토큰, 디자인 시스템 판단: `docs/design/DESIGN.md`
- UI 작업 방식과 디자인 작업 절차 판단: `docs/design/SKILL.md`

## Priority Rule

- `AGENTS.md`는 프로젝트 맥락, 범위, 가드레일을 제공하는 요약 문서다.
- 상세 요구사항은 각 reference document를 source of truth로 본다.
- 문서 간 충돌 시에는 더 구체적인 문서를 우선한다.
- 구현 중 판단이 필요하면 범위를 넓히지 말고 현재 Sprint와 reference document 기준으로 결정한다.
