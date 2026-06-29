# GIT_CONVENTION

이 저장소의 브랜치·커밋·PR 규칙이다. 지금까지의 브랜치명과 커밋 내역에서 실제로 쓰이고 있는 규칙을 정리했다. 새 작업도 이 규칙을 따른다.

## 브랜치 전략

- 기본 통합 브랜치는 **`develop`** 이다(원격 기본 브랜치). 모든 작업 브랜치는 `develop`에서 분기하고 `develop`으로 PR을 보낸다.
- **`main`** 은 배포/안정 브랜치다. `develop`에서 검증된 변경만 올라간다.
- 작업은 항상 별도 브랜치에서 한다. `develop`/`main`에 직접 커밋하지 않는다.

### 브랜치 이름

형식: `<type>/<이슈번호>-<짧은-kebab-설명>`

```
feat/29-voice-buffer
feat/10-main-dashboard-ui
feat/11-audio-record-down-sampling
refactor/24-websocket-to-stomp
refactor/23-tailwind-to-emotion
setting/1-ai-agent-skills
```

- `<type>`: 아래 커밋 타입과 동일한 어휘를 쓴다(`feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`).
- `<이슈번호>`: 연결된 GitHub 이슈 번호. 이슈가 없으면 생략하고 설명만 쓴다(예: `chore/handover-docs`).
- `<설명>`: 영문 kebab-case로 짧게. 무엇을 하는 브랜치인지 드러나게.

## 커밋 메시지

[Conventional Commits](https://www.conventionalcommits.org/) 형식 + **한국어 설명**을 쓴다.

형식: `<type>(<scope>): <설명>` — scope는 선택.

```
feat: STOMP 재연결 및 음성 데이터 버퍼 구현, 연결 UI 개선
fix: 토론 종료 시 WebSocket STOP 전송 보장하도록 수정
refactor: API, STOMP broker URL 정규화
docs: 요구사항 명세서 업데이트
test: STOMP 단위 테스트 추가
chore(deps): update pnpm to v11
```

### 타입

| 타입 | 용도 |
| --- | --- |
| `feat` | 새 기능 |
| `fix` | 버그 수정 |
| `refactor` | 동작 변화 없는 구조 개선 |
| `docs` | 문서 변경 |
| `test` | 테스트 추가/수정 |
| `style` | 포맷·스타일(동작 변화 없음) |
| `chore` | 빌드·의존성·설정 등 잡무 (`chore(deps)`처럼 scope 사용 가능) |

- 제목은 명령형/요약형으로 간결하게. 한 줄로 무엇을/왜 했는지 드러나게 쓴다.
- 하나의 커밋은 하나의 논리적 변경만 담는다.

## Pull Request

- PR은 `develop`을 대상으로 만든다. 제목은 커밋 규칙과 같은 어휘를 권장한다.
- 본문은 [PR 템플릿](../.github/pull_request_template.md)을 채운다.
  - 첫 줄 `close #<이슈번호>` 로 이슈를 연결한다.
  - `작업 내용` / `변경 사항` / `확인한 동작`(체크리스트) / `리뷰 포인트`.
- 병합은 GitHub PR을 통해 한다(이력에 `Merge pull request #N from <org>/<branch>` 형태로 남는다).

## 머지 전 검증 (CI 게이트)

PR은 [CI](../.github/workflows/ci.yml)에서 아래를 통과해야 한다. 로컬에서 먼저 돌려보길 권장한다.

```bash
pnpm typecheck
pnpm lint
pnpm test:run
pnpm build
```

- CI는 `main`·`develop` 대상 push/PR에서 동작한다(Node 22, pnpm 9.15.9).
- `quality` 잡(typecheck·lint·test·build) 통과 후 `e2e`(Playwright + Storybook) 잡이 실행된다.

## 관련 문서

- [에이전트 작업 방식](AGENT_WORKFLOW.md)
- [코드 컨벤션](frontend/CODE_CONVENTION.md)
- [프로젝트 진입점 README](../README.md)
