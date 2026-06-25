# debate-tracker-frontend

Debate Tracker 프론트엔드 프로젝트입니다.  
프로젝트 시작 문서입니다.

## 시작 가이드

처음 이 프로젝트를 받은 뒤, Node.js·pnpm이 설치되어 있지 않은 환경에서 개발 서버를 띄우기까지의 전체 과정입니다.

### 요구사항

| 항목 | 버전 |
| --- | --- |
| Node.js | 20 이상 (권장: 22 LTS) |
| pnpm | 9.15.9 (`package.json`의 `packageManager`와 동일) |
| Git | 저장소 clone용 |

### 1. Node.js 설치

터미널에서 아래 명령으로 설치 여부를 확인합니다.

```bash
node -v
```

`v20.x.x` 이상이 출력되면 이 단계는 건너뛰어도 됩니다. `command not found` 또는 버전이 낮다면 Node.js를 설치합니다.

**Windows**

1. [Node.js 공식 사이트](https://nodejs.org/)에서 **LTS(22.x)** 설치 파일을 받아 실행합니다.
2. 설치 마법사에서 **Add to PATH** 옵션이 켜져 있는지 확인합니다.
3. 설치 후 **새 터미널**을 열고 `node -v`, `npm -v`로 확인합니다.

> Windows에서 여러 Node 버전을 관리하려면 [nvm-windows](https://github.com/coreybutler/nvm-windows)를 사용할 수 있습니다.

**macOS / Linux**

- macOS: [Node.js 공식 사이트](https://nodejs.org/) LTS 설치, 또는 `brew install node@22`
- Linux: 배포판 패키지 매니저, [nvm](https://github.com/nvm-sh/nvm), [fnm](https://github.com/Schniz/fnm) 등

```bash
# nvm 예시
nvm install 22
nvm use 22
```

### 2. pnpm 설정 (Corepack 권장)

이 프로젝트는 `package.json`에 `packageManager: "pnpm@9.15.9"`가 지정되어 있습니다.  
Node.js 16.13+에 포함된 **Corepack**을 사용하면 팀 전체가 동일한 pnpm 버전을 쓸 수 있습니다.

```bash
# Corepack 활성화 (최초 1회)
corepack enable

# 프로젝트 루트에서 pnpm 버전 확인
pnpm -v
# → 9.15.9
```

`corepack enable`이 권한 오류로 실패하면:

- **Windows**: 관리자 권한 PowerShell/CMD에서 다시 실행하거나, Node.js를 재설치합니다.
- **macOS / Linux**: `sudo corepack enable`을 시도합니다.

**Corepack 대안 — pnpm 직접 설치**

Corepack을 쓰지 않는 경우:

```bash
npm install -g pnpm@9.15.9
pnpm -v
```

### 3. 저장소 받기

이미 clone되어 있다면 이 단계는 건너뜁니다.

```bash
git clone <저장소 URL>
cd debate-tracker-frontend
```

### 4. 의존성 설치

프로젝트 루트(`package.json`이 있는 디렉터리)에서 실행합니다.

```bash
pnpm install
```

`pnpm-lock.yaml`과 일치하는 버전으로 패키지가 설치됩니다.

### 5. 개발 서버 실행

```bash
pnpm dev
```

정상 기동 시 터미널에 로컬 URL(기본: `http://localhost:5173`)이 표시됩니다. 브라우저에서 해당 주소로 접속합니다.

개발 모드에서는 [MSW](https://mswjs.io/)가 API를 모킹하므로, 백엔드 없이도 UI를 확인할 수 있습니다.  
실제 API·WebSocket 연동이 필요하면 백엔드를 `http://localhost:8080`에서 실행하세요. (`vite.config.ts`의 `/api`, `/ws` 프록시 대상)

### 6. 설치 확인 (선택)

기본 개발 흐름이 되는지 빠르게 점검하려면:

```bash
pnpm typecheck   # TypeScript 검사
pnpm lint        # ESLint
pnpm test:run    # 단위 테스트
pnpm build       # 프로덕션 빌드
```

E2E·Storybook 브라우저 테스트를 로컬에서 돌릴 때는 Playwright 브라우저 설치가 추가로 필요합니다.

```bash
pnpm exec playwright install --with-deps chromium
pnpm test:e2e
pnpm test:storybook
```

### 자주 겪는 문제

| 증상 | 해결 |
| --- | --- |
| `node`, `pnpm`을 찾을 수 없음 | Node.js 설치 후 **터미널을 새로 열기**. PATH에 Node가 포함됐는지 확인 |
| `corepack enable` 실패 | 관리자 권한으로 재시도하거나 `npm install -g pnpm@9.15.9` 사용 |
| `pnpm install` 중 엔진 오류 | `node -v`가 20 미만이면 Node.js 업그레이드 |
| `pnpm` 버전이 9.15.9가 아님 | `corepack enable` 후 프로젝트 루트에서 다시 `pnpm install` |
| 포트 5173 사용 중 | 다른 Vite/개발 서버 종료 후 재실행, 또는 Vite가 안내하는 다른 포트 사용 |
| 실제 백엔드를 붙였는데 mock 응답이 옴 | dev에서는 MSW가 활성화되어 있습니다. `src/mocks/handlers.ts`에 정의된 경로는 mock이 가로챕니다. 실제 응답을 보려면 해당 핸들러를 제거하거나, 정의되지 않은 경로는 `vite.config.ts`의 `/api`·`/ws` 프록시(→ `localhost:8080`)로 전달됩니다 |
| API/WebSocket 연결이 안 됨 | 백엔드가 `http://localhost:8080`에서 떠 있는지, `vite.config.ts` 프록시 대상과 일치하는지 확인 |

### 빌드

```bash
pnpm build
```

### 테스트

```bash
pnpm test
pnpm test:run
pnpm test:e2e
```

## 코드 둘러보기 & 첫 변경

프론트엔드가 처음이라면, 아래 순서로 코드를 파악한 뒤 작은 변경으로 흐름을 익히세요.

### 어디부터 보나 (코드 지도)

```text
src/
├─ app/        # 앱 부트스트랩: providers, router(/, /setup, /debates/:id), 세션 레이아웃
├─ pages/      # 라우트별 화면 조합 (landing, debateSetup, mainDashboard) — 얇은 층
├─ features/   # 도메인 기능 (debate, debateSetup, transcript, issueSummary, audioCapture, mainDashboard)
├─ shared/     # 공통 UI(shared/ui), API 클라이언트(shared/api), 전역 store(shared/store)
└─ styles/     # 디자인 토큰(theme.ts), 전역 스타일
```

- 진입점은 `src/main.tsx` → `src/app/providers.tsx` → `src/app/router.tsx` 순서입니다.
- 한 기능이 어떻게 동작하는지 보려면 해당 `features/<name>/` 폴더 하나만 보면 됩니다(api/hooks/components/lib).
- 전체 그림과 데이터 흐름은 [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), 규칙은 [docs/frontend/CODE_CONVENTION.md](docs/frontend/CODE_CONVENTION.md)를 보세요.

### 첫 변경 실습

작은 변경 하나로 "수정 → 확인 → 검증" 루프를 익혀 보세요.

1. `pnpm dev`로 개발 서버를 띄우고 브라우저에서 랜딩(`/`)을 엽니다.
2. 랜딩 문구를 한 곳 바꿔 봅니다. 텍스트는 `src/pages/landing/` 안의 컴포넌트(또는 `landingContent.ts`)에 있습니다.
3. 저장하면 브라우저가 자동 갱신(HMR)됩니다. 변경이 반영됐는지 확인합니다.
4. 검증 명령을 돌립니다.

```bash
pnpm typecheck && pnpm lint && pnpm test:run
```

5. 통과하면 의미 단위로 작게 커밋합니다.

### 알아두면 좋은 용어

핵심 도메인 용어와 코드 식별자 매핑은 [요구사항 문서의 용어집](docs/product/REQUIREMENTS.md#3-용어집-도메인--코드)에 있습니다. 요약: 음성=`audio`, 주제=`topic`, 쟁점=`agenda`, 주장=`claim`, 근거=`evidence`, 미확정/확정 발화=`partial`/`final`.

## 관련 문서

### AI 에이전트 (먼저 읽기)

- [AGENTS.md](AGENTS.md) — 프로젝트 가드레일 + 어떤 작업에 어떤 문서를 읽을지 라우팅하는 허브
- [CLAUDE.md](CLAUDE.md) — Claude Code용 진입점 (AGENTS.md를 가리킴)
- [에이전트 작업 방식](docs/AGENT_WORKFLOW.md) — 툴 무관 표준 작업 절차

### Product

- [요구사항](docs/product/REQUIREMENTS.md) — 제품 개요·화면·핵심 흐름
- [클라이언트 음성 입력 및 전처리](docs/product/CLIENT_AUDIO_CAPTURE.md)

### Frontend

- [코드 컨벤션](docs/frontend/CODE_CONVENTION.md) — 폴더 구조, React 19 규칙, 용어집, 네이밍
- [아키텍처](docs/ARCHITECTURE.md) — 레이어·데이터 흐름·알려진 복잡도
- [Git 컨벤션](docs/GIT_CONVENTION.md) — 브랜치·커밋·PR·CI 규칙

### UI 개발 (선택)

```bash
pnpm storybook      # 공통 컴포넌트 Storybook (http://localhost:6006)
pnpm build-storybook
```

Chromatic 배포는 `CHROMATIC_PROJECT_TOKEN` 환경 변수를 사용합니다. 토큰은 Git에 커밋하지 않고 팀 내부 채널로만 공유하세요.

- 로컬: 프로젝트 루트 `.env`에 `CHROMATIC_PROJECT_TOKEN=...` 설정 후 `pnpm chromatic` (`dotenv-cli`가 `.env`를 읽어 chromatic에 전달)
- 이미 셸에 `export CHROMATIC_PROJECT_TOKEN=...` 되어 있으면 `.env` 없이도 동작하며, dotenv는 기존 값을 덮어쓰지 않음
- CI: GitHub **Settings → Secrets → Actions**에 `CHROMATIC_PROJECT_TOKEN` 등록

## 문서 운영 규칙

- 문서 추가/개편 시 이 README의 `관련 문서` 부분을 반드시 함께 갱신합니다.
