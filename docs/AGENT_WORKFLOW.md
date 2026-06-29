# AGENT_WORKFLOW

AI 에이전트로 이 프로젝트를 작업하는 표준 절차다. **특정 IDE/도구에 의존하지 않는다.** Claude Code, Cursor, 또는 사람이 직접 작업할 때 모두 동일하게 적용한다.

핵심 사상: **문서가 의사결정의 기준이다.** 막히면 추측하지 말고 관련 문서를 읽고, 문서에 없으면 범위를 좁혀 질문한다.

## 표준 절차 (5단계)

1. **문서 먼저 읽기** — [AGENTS.md](../AGENTS.md)의 Document Routing 표에서 작업에 맞는 문서를 찾아 읽는다.
2. **범위 확인** — 요구가 모호하면 범위를 넓히지 않는다. 현재 Sprint/문서 기준의 최소 구현을 택한다.
3. **컨벤션대로 구현** — [CODE_CONVENTION.md](frontend/CODE_CONVENTION.md)를 따른다. 기존 공통 컴포넌트·패턴을 우선 재사용한다.
4. **자가 검증** — 아래 명령으로 통과를 확인한다.
   ```bash
   pnpm typecheck
   pnpm lint
   pnpm test:run
   ```
5. **작은 단위로 마무리** — 변경을 의미 단위로 작게 커밋한다. 브랜치·커밋·PR 규칙은 [GIT_CONVENTION.md](GIT_CONVENTION.md)를 따른다. 무엇을/왜 바꿨는지 한 줄로 설명할 수 있어야 한다.

## 작업 유형별 진입 문서

| 작업 | 먼저 읽을 것 |
| --- | --- |
| 새 화면/기능 | REQUIREMENTS → CODE_CONVENTION → ARCHITECTURE |
| 기존 코드 수정 | ARCHITECTURE(해당 영역) → 대상 코드 → CODE_CONVENTION |
| 실시간(STT/STOMP) | ARCHITECTURE(실시간 흐름) → AGENTS 실시간 규칙 → transcript feature |
| 음성/오디오 | CLIENT_AUDIO_CAPTURE → audioCapture feature |
| 스타일/토큰 | CODE_CONVENTION §12 → `src/styles/theme.ts` |

## 하지 말 것

- 범위 확장: 요청하지 않은 기능·옵션·설정을 임의로 추가하지 않는다.
- 과설계: 미리 추상화하지 않는다. 같은 패턴이 3번째 반복될 때 고려한다(CODE_CONVENTION §7).
- 불필요한 상태/effect: 렌더 중 계산 가능한 값을 state·`useEffect`로 만들지 않는다(CODE_CONVENTION §5, §8).
- 쉬운 로직을 어렵게 풀기: 영리한 한 줄보다 읽기 쉬운 여러 줄.
- 검증 생략: typecheck/lint/test 없이 작업을 끝내지 않는다.

## 막혔을 때

1. 관련 문서를 다시 읽는다(Document Routing).
2. 비슷한 기존 코드를 찾아 패턴을 따른다.
3. 그래도 모호하면, 범위를 넓히지 말고 **구체적인 선택지로 좁혀** 질문한다.

## 검증 명령 요약

| 명령 | 용도 |
| --- | --- |
| `pnpm dev` | 개발 서버 |
| `pnpm typecheck` | 타입 검사 |
| `pnpm lint` | ESLint |
| `pnpm test:run` | 단위 테스트 |
| `pnpm build` | 프로덕션 빌드 검증 |

## 관련 문서

- [AGENTS.md](../AGENTS.md)
- [CODE_CONVENTION.md](frontend/CODE_CONVENTION.md)
- [GIT_CONVENTION.md](GIT_CONVENTION.md)
- [ARCHITECTURE.md](ARCHITECTURE.md)
- [REQUIREMENTS.md](product/REQUIREMENTS.md)
