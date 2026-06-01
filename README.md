# debate-tracker-frontend

Debate Tracker 프론트엔드 프로젝트입니다.  
프로젝트 시작 문서입니다.

## 시작 가이드

### 요구사항

- Node.js 20+
- pnpm 9+

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

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
