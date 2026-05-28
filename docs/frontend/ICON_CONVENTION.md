# ICON_CONVENTION

## 목적

- 아이콘 자산의 일관된 import/사용 방식을 정의합니다.
- 색상/크기/접근성 규칙을 통일해 UI 품질을 유지합니다.

## 자산 위치

- SVG 원본: `src/shared/ui/icons/*.svg`
- 배럴 export: `src/shared/ui/icons/index.ts`

## 빌드/변환 규칙

- SVG를 React 컴포넌트로 사용하기 위해 `vite-plugin-svgr`를 사용합니다.
- import는 `?react` 쿼리를 사용합니다.
  - 예: `import SearchIcon from "./Search.svg?react";`
- 팀 코드에서는 배럴 경유 import를 기본으로 합니다.
  - 예: `import { SearchIcon } from "@/shared/ui/icons";`

## 색상 규칙

- 기본 규칙: 단색 아이콘은 `currentColor`를 사용합니다.
  - 색상은 `className`의 `text-*` 유틸리티/토큰으로 제어합니다.
- 예외 규칙: `Logo.svg`는 브랜드 고정색을 유지합니다.
  - `Logo.svg`의 내부 fill/stroke는 임의로 `currentColor`로 바꾸지 않습니다.

## 크기 규칙

- 현재 SVG는 표준화된 viewBox/기본 크기를 전제로 관리합니다.
- 화면에서는 Tailwind 유틸리티(`size-*`, `w-*`, `h-*`)로 크기를 지정합니다.
  - 예: `className="size-5"`

## 네이밍/Export 규칙

- 파일명: PascalCase SVG 파일명 사용 (`Search.svg`, `ChevronRight.svg`)
- 컴포넌트 export명: `SomethingIcon` 형태
  - 예: `SearchIcon`, `ChevronRightIcon`, `LogoIcon`

## 사용 예시

```tsx
import { SearchIcon, LogoIcon } from "@/shared/ui/icons";

export function HeaderIcons() {
  return (
    <div className="flex items-center gap-2">
      <SearchIcon className="size-5 text-text-secondary" aria-hidden="true" />
      <LogoIcon className="h-6 w-auto" aria-label="Debate Tracker" />
    </div>
  );
}
```

## 접근성 규칙

- 장식용 아이콘: `aria-hidden="true"`를 사용합니다.
- 의미 전달 아이콘: `aria-label` 또는 주변 텍스트와 함께 사용합니다.
- 아이콘만 있는 버튼은 버튼에 접근 가능한 이름(`aria-label`)을 제공합니다.

## 금지 사항

- 배럴을 우회한 임의 경로 import 남발
- 단색 아이콘에 고정 hex 색상 재삽입
- `Logo.svg` 브랜드 컬러 임의 변경
