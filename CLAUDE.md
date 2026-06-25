# CLAUDE.md

Claude Code용 진입점이다. 이 프로젝트의 규칙과 작업 방식은 도구에 종속되지 않으며, 아래 문서를 source of truth로 따른다.

- 프로젝트 가드레일 + 문서 라우팅: [AGENTS.md](AGENTS.md)
- 표준 작업 절차: [docs/AGENT_WORKFLOW.md](docs/AGENT_WORKFLOW.md)
- 코드 컨벤션: [docs/frontend/CODE_CONVENTION.md](docs/frontend/CODE_CONVENTION.md)

## 절대 규칙 (요약)

- 작업 전 관련 문서를 먼저 읽는다. 범위를 임의로 넓히지 않는다.
- 쉬운 로직을 어렵게 풀지 않는다. 불필요한 추상화·상태·`useEffect`를 만들지 않는다.
- 변경 후 반드시 검증한다:

```bash
pnpm typecheck
pnpm lint
pnpm test:run
```

상세 내용은 [AGENTS.md](AGENTS.md)를 따른다.
