# 공통 컴포넌트 — Figma 인벤토리

- **파일:** [디베이트 트래커 Figma](https://www.figma.com/design/0gGAyITMJYWJaE7uGGGMS9/)
- **라이브러리 프레임:** `3:973` ([링크](https://www.figma.com/design/0gGAyITMJYWJaE7uGGGMS9/?node-id=3-973))
- **MVP 화면:** `203:1359` ([링크](https://www.figma.com/design/0gGAyITMJYWJaE7uGGGMS9/?node-id=203-1359))
- **Storybook:** `pnpm storybook` → `Shared/UI/*`

## 구현 매핑

| Figma § | 컴포넌트 | 코드 경로 | Storybook |
|---------|----------|-----------|-----------|
| 1. Buttons | Button | `src/shared/ui/button` | Shared/UI/Button |
| 2. Navigation | Navigation | `src/shared/ui/navigation` | Shared/UI/Navigation |
| 3. Tabs | Tabs | `src/shared/ui/tab` | Shared/UI/Tabs |
| 4. Badges | Badge | `src/shared/ui/badge` | Shared/UI/Badge |
| 5. Cards | Card (프리미티브) | `src/shared/ui/card` | Shared/UI/Card |
| 6. Form Controls | Input, Checkbox, Toggle | `input`, `checkbox`, `toggle` | 각 스토리 |
| 7. Accordion | Accordion | `src/shared/ui/accordion` | Shared/UI/Accordion |
| 8. Empty/Loading/Error | EmptyState, LoadingState, ErrorState | `src/shared/ui/feedback` | Shared/UI/Feedback |
| 9. Quote Box | QuoteBox | `src/shared/ui/quote-box` | Shared/UI/QuoteBox |
| Header | AppHeader (shell), HeaderBrand | `src/shared/ui/header` | Shared/UI/AppHeader |
| 10. Service-specific (조합) | trailing 주입·상태 매핑 | `app` / `features/*` | — |

## Figma 추출 nodeId (대표)

| 스펙 | nodeId |
|------|--------|
| Primary Default | `3:1003` |
| Secondary Default | `3:1055` |
| Danger Default | `3:1082` |
| FAB | `3:1097` |
| Global Navigation | `3:1111` |
| Empty State | `3:1383` |
| Quote Box | `3:1432` |
