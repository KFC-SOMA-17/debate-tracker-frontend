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

## 관련 문서

### Product

- [요구사항](docs/product/REQUIREMENTS.md)
- [화면 명세](docs/product/SCREEN_SPEC.md)
- [클라이언트 음성 입력 및 전처리](docs/product/CLIENT_AUDIO_CAPTURE.md)

### Design

- [디자인 가이드](docs/design/DESIGN.md)
- [디자인 스킬](docs/design/SKILL.md)
- [Figma MCP 매뉴얼](docs/figma-mcp-manual.md)
- [공통 컴포넌트 인벤토리](docs/design/components/README.md)

### UI 개발

```bash
pnpm storybook      # 공통 컴포넌트 Storybook (http://localhost:6006)
pnpm build-storybook
```

Chromatic 배포는 `CHROMATIC_PROJECT_TOKEN` 환경 변수를 사용합니다. 토큰은 Git에 커밋하지 않고 팀 내부 채널로만 공유하세요.

- 로컬: 프로젝트 루트 `.env`에 `CHROMATIC_PROJECT_TOKEN=...` 설정 후 `pnpm chromatic` (`dotenv-cli`가 `.env`를 읽어 chromatic에 전달)
- 이미 셸에 `export CHROMATIC_PROJECT_TOKEN=...` 되어 있으면 `.env` 없이도 동작하며, dotenv는 기존 값을 덮어쓰지 않음
- CI: GitHub **Settings → Secrets → Actions**에 `CHROMATIC_PROJECT_TOKEN` 등록

### Frontend Conventions

- [코드 컨벤션](docs/frontend/CODE_CONVENTION.md)
- [아이콘 컨벤션](docs/frontend/ICON_CONVENTION.md)

## 문서 운영 규칙

- 문서 추가/개편 시 이 README의 `관련 문서` 부분을 반드시 함께 갱신합니다.
