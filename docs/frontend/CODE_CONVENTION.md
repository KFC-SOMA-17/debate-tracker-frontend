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

### useEffect 작성

- Hook 호출은 조건문·반복문 밖에서만 한다 (Rules of Hooks).
- effect 본문에서 `if/else`로 setup·teardown 경로를 나누지 않는다. 실행마다 다른 동작이 들어가면 cleanup과의 대칭이 깨지기 쉽다.
- 조건이 맞지 않을 때는 early return으로 setup/cleanup을 생략한다.
- 구독·리셋·ref 동기화처럼 관심사가 다르면 effect를 분리한다.
- cleanup은 effect 본문의 setup과 항상 1:1로 대응해야 한다.

```tsx
// ✅ 가드 + 대칭 cleanup
useEffect(() => {
  if (!active) {
    return;
  }

  const sub = subscribe();
  return () => sub.unsubscribe();
}, [active]);

// ❌ 분기마다 다른 동작 + cleanup은 항상 동일
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

## 8. 스타일링 규칙

- Emotion (`@emotion/styled`)을 기본 스타일링 방식으로 사용한다.
- 디자인 토큰은 `src/styles/theme.ts`를 source of truth로 사용한다.
- 컴포넌트 스타일은 `*.styles.ts`에 styled component로 분리한다.
- variant/size 등 DOM에 전달되지 않아야 하는 prop은 transient prop(`$variant` 등)을 사용한다.
- 색상/여백/radius/typography는 semantic token을 우선 사용한다.
- 공통 스타일 fragment는 `src/styles/mixins.ts`에 둔다.
- 동적 좌표/크기/transform은 inline style 허용

## 9. 테스트 규칙

- 테스트 파일은 대상 파일 근처에 배치
- 사용자 관찰 가능 결과 중심으로 검증
- 외부 API/네트워크는 MSW 기반 mock 사용

## 10. 파일·폴더 네이밍

`src` 아래 **소스 파일**은 역할에 따라 케이스를 구분한다. kebab-case(`toast-context.ts`, `use-modal-effects.ts`)는 **사용하지 않는다**.

### 소스 파일 (`src/**`)

| 대상                        | 케이스                      | 확장자         | 예시                                                                                        |
| --------------------------- | --------------------------- | -------------- | ------------------------------------------------------------------------------------------- |
| React 컴포넌트              | **PascalCase**              | `.tsx`         | `Button.tsx`, `ModalRoot.tsx`, `ToastProvider.tsx`                                          |
| Hook                        | **camelCase**, `use` 접두사 | `.ts` / `.tsx` | `useToast.ts`, `useModalEffects.ts`                                                         |
| Context + 전용 hook (한 쌍) | **camelCase**               | `.ts`          | `useModalContext.ts` — `createContext`와 hook을 **같은 파일**에 둔다 (`ModalContext.ts` ❌) |
| 컴포넌트 묶음의 타입·상수   | **아래 §10.1**              | `.ts`          | `Toast.types.ts`, `constants.ts`                                                            |
| 유틸·순수 함수              | **camelCase**               | `.ts`          | `cn.ts`, `formatDuration.ts`                                                                |
| 배럴 export                 | `index`                     | `.ts`          | `index.ts`                                                                                  |
| Storybook                   | 컴포넌트명 + `.stories`     | `.tsx`         | `Button.stories.tsx`                                                                        |
| 테스트                      | 대상명 + `.test`            | `.ts` / `.tsx` | `useToast.test.ts`                                                                          |

### 10.1 컴포넌트 폴더 안의 타입·상수 파일

이미 `toast/`, `modal/`처럼 **컴포넌트 묶음 폴더**가 있으면, 파일명에 `toast.`처럼 폴더명을 **다시 붙이지 않는다** (`toast.constants.ts` ❌).

우선순위는 다음과 같다.

1. **역할만** — 폴더가 네임스페이스 (`types.ts`, `constants.ts`)
2. **PascalCase 엔티티 + dot suffix** — 묶음의 대표 이름이 분명할 때 (`Toast.types.ts`, `Toast.constants.ts`)
   - `Button.stories.tsx`, `useToast.test.ts`와 같은 **부속 파일** 네이밍과 맞춘다.
   - 컴포넌트가 아니어도 `.ts`이면 PascalCase 파일명을 써도 된다.
3. **camelCase 단일 모듈** — `shared/lib`, `api`, `utils`처럼 컴포넌트 폴더 밖 (`formatDuration.ts`)

Toast처럼 `Toast.tsx`·`ToastProvider.tsx` 여러 파일이 한 묶음이면 **`Toast.constants.ts` / `Toast.types.ts`** 가 자연스럽다. Modal 전용 타입만 모을 때는 **`Modal.types.ts`** 도 동일 규칙이다.

Context 객체는 **`useToast.ts`**, **`useModalContext.ts`** 처럼 hook 파일에 함께 둔다. Provider·Root는 해당 hook 파일에서 `ToastContext` / `ModalContext`만 import한다.

### 폴더

- **소스 파일**은 kebab-case를 쓰지 않는다(§10 첫 문단). **디렉터리**도 기본적으로 kebab-case를 쓰지 않는다.
- **pages / features** 슬라이스: **camelCase** 디렉터리 (`pages/mainDashboard/`, `features/debateSession/`).
  - URL path가 kebab이어도 (`/debates/:id`) 폴더명과 route 문자열을 맞출 필요는 없다. kebab은 라우터·nav id 등 **경로 문자열**에만 둔다.
- **shared/ui** 컴포넌트 묶음: 단어 하나면 소문자 (`button/`, `modal/`), 여러 단어면 **camelCase** (`quoteBox/`).
- `main-dashboard/`, `quote-box/`처럼 kebab 디렉터리는 사용하지 않는다.

### 예외 (kebab-case 허용)

- 프로젝트 루트·도구 설정: `eslint.config.js`, `vite.config.ts`
- `docs/`, `public/` 등 비-`src` 경로

### import 경로

- 파일명과 export 이름을 맞춘다 (`Toast.tsx` → `export function Toast`).
- 같은 feature/컴포넌트 폴더 안에서는 **상대 경로** (`./useToast.ts`)를 우선한다.

### 기존 코드

- kebab-case로 남아 있는 파일은 **수정할 때** PascalCase/camelCase로 맞춘다.
- 한 PR에서 대규모 일괄 rename은 팀과 합의 후 진행한다.

## 관련 문서

- [ICON_CONVENTION](ICON_CONVENTION.md)
- [프로젝트 진입점 README](../../README.md)
