# CODE_CONVENTION

기존 `CONVENTIONS..md` 내용을 frontend 코드 컨벤션 문서로 명확히 분리한 문서입니다.

## 1. 기본 원칙

- 기능 구현 속도와 구조적 안정성을 함께 고려한다.
- 처음부터 과도한 아키텍처를 적용하지 않고, 도메인 기반 구조로 시작한다.
- 화면/기능/공통 UI 책임을 분리한다.
- 서버 상태, 실시간 스트림 상태, UI 상태, 로컬 상태를 구분한다.
- 스타일과 포맷은 ESLint, Prettier에 위임한다.

## 2. 폴더 구조

```text
src
├─ app
├─ pages
├─ features
├─ shared
│  └─ ui
├─ api
├─ stores
├─ hooks
├─ types
├─ utils
└─ styles
```

## 3. 컴포넌트 작성 규칙

- 하나의 컴포넌트는 하나의 명확한 역할을 가진다.
- 공통 컴포넌트는 도메인/서버 의존을 직접 가지지 않는다.
- 기능 컴포넌트는 공통 컴포넌트를 조합해 도메인 기능을 구현한다.
- 페이지 컴포넌트는 화면 조합과 페이지 단위 상태 처리에 집중한다.

## 4. 상태 관리 규칙

- 서버 상태: TanStack Query
- 실시간 스트림 상태: feature hook 또는 전용 store
- 전역 UI 상태: Zustand
- 로컬 상태: `useState`
- 서버 데이터를 전역 store에 중복 저장하지 않는다.

## 5. 타입 규칙

- API 요청/응답 타입 분리
- UI 표시용 타입이 필요하면 mapper를 통해 분리
- socket 이벤트 타입은 이벤트 종류를 명확히 구분

## 6. API 호출 규칙

- 컴포넌트에서 직접 fetch 호출 금지
- API 레이어 함수로 분리
- 컴포넌트는 URL/method를 직접 알지 않도록 구성

## 7. Hook 규칙

- 재사용 로직은 hook으로 분리
- feature 종속 hook은 feature 내부에 위치
- 범용 hook만 공용 hooks에 둔다

## 8. 스타일링 규칙

- Tailwind CSS를 기본 스타일링 방식으로 사용한다.
- 디자인 토큰은 Tailwind v4 `@theme inline` 기반 토큰을 우선 사용한다.
- 색상/여백/radius/typography는 semantic token을 우선 사용한다.
- 동적 좌표/크기/transform은 inline style 허용

## 9. 테스트 규칙

- 테스트 파일은 대상 파일 근처에 배치
- 사용자 관찰 가능 결과 중심으로 검증
- 외부 API/네트워크는 MSW 기반 mock 사용

## 관련 문서

- [ICON_CONVENTION](ICON_CONVENTION.md)
- [프로젝트 진입점 README](../../README.md)
