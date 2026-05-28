# Debate Tracker Design Guide

Clean 테마 기반 디자인 시스템 운영 문서다.  
목표는 신규 화면/컴포넌트 추가 시 동일한 토큰 규칙과 UI 품질을 유지하는 것이다.

---

## 1) 토큰 레이어 규칙

디자인 토큰은 반드시 2개 레이어로 관리한다.

### Layer A: Base Tokens (원시 값)

- 목적: 색상/간격/반경/폰트의 원시 값을 단일 위치에서 정의
- 네이밍: `--{category}-base-*`
- 예시: `--color-base-blue-500`, `--color-base-gray-200`

### Layer B: Semantic Tokens (의미 기반 값)

- 목적: UI 역할(배경/텍스트/경계/상태)을 표현
- 네이밍: `--{category}-{role}-{level}`
- 예시: `--color-bg-default`, `--color-text-secondary`, `--color-border-subtle`
- 규칙: 컴포넌트/페이지에서는 Base Token을 직접 사용하지 않고 Semantic Token만 사용

### 레이어 사용 원칙

1. 신규 값 추가 시 Base Token 먼저 정의한다.
2. 기존 역할에 매핑 가능하면 새 Semantic Token을 만들지 않는다.
3. 동일 역할에서 상태만 다른 경우 suffix로 구분한다.
   - 예: `default`, `subtle`, `muted`, `strong`, `inverse`

---

## 2) 토큰 네이밍 컨벤션

### Color

- Base: `--color-base-{hue}-{scale}`
  - 예: `--color-base-blue-500`
- Semantic:
  - Background: `--color-bg-{role}`
  - Text: `--color-text-{role}`
  - Border: `--color-border-{role}`
  - Accent: `--color-accent-{role}`
  - Status: `--color-status-{role}`

### Typography

- Font family:
  - `--font-body`: `"Roboto", "Noto Sans KR", ...`
  - `--font-display`: `"Poppins", "Roboto", "Noto Sans KR", ...`
  - `--font-code`: `"Inconsolata", ...`
- Text size/line-height:
  - `--text-{group}-{size}`
  - `--text-{group}-{size}--line-height`
  - 예: `--text-body-md`, `--text-title-lg--line-height`

### Spacing (4px baseline)

- 네이밍: `--spacing-{step}`
- 단위:
  - `1 = 4px`, `2 = 8px`, `3 = 12px`, `4 = 16px`
  - `5 = 20px`, `6 = 24px`, `8 = 32px`, `10 = 40px`, `12 = 48px`, `16 = 64px`
- 규칙: 레이아웃과 컴포넌트 간격은 위 step만 사용한다.

### Radius

- 네이밍: `--radius-{size}`
- 기본 세트: `none`, `sm`, `md`, `lg`, `xl`, `pill`

---

## 3) 사용 금지 규칙

아래 항목은 특별한 이유가 있는 경우를 제외하고 금지한다.

1. 컴포넌트 내부에서 raw hex 직접 사용 금지 (`#3B82F6` 등)
2. 컴포넌트 내부에서 Base Color Token 직접 사용 금지 (`--color-base-*`)
3. 임의 spacing 값 사용 금지 (`10px`, `18px`, `22px` 등)
4. 임의 radius 값 사용 금지 (`7px`, `10px` 등)
5. 의미 없는 토큰명 금지 (`--color-blue`, `--text-main` 등)
6. 상태 색상(성공/경고/위험)을 텍스트/배경/보더 용도로 혼용 금지

예외가 필요한 경우:

- 반드시 문서에 근거와 만료 시점(언제 표준 토큰으로 환원할지)을 남긴다.

---

## 4) 컴포넌트 매핑 규칙

신규 컴포넌트는 아래 매핑을 기본값으로 시작한다.

### 공통 Surface 계열

- 카드/패널/모달: `bg = --color-bg-elevated`, `border = --color-border-default`
- 페이지 배경: `bg = --color-bg-subtle`
- 비활성/보조 영역: `bg = --color-bg-muted`

### 텍스트 계열

- 제목/본문 핵심 정보: `--color-text-primary`
- 보조 정보/메타 정보: `--color-text-secondary`
- 비강조 라벨/힌트: `--color-text-muted`
- 역상 배경 위 텍스트: `--color-text-inverse`

### 상태/피드백 계열

- 성공: `--color-status-success`
- 경고: `--color-status-warning`
- 위험: `--color-status-danger`
- 기본 강조(버튼 primary, active): `--color-accent-primary`
- 보조 강조(secondary action): `--color-accent-secondary`

### 간격/반경 기본값

- 버튼/입력/일반 카드:
  - padding: `--spacing-2` ~ `--spacing-4`
  - radius: `--radius-md`
- 모달/대형 패널:
  - padding: `--spacing-4` ~ `--spacing-6`
  - radius: `--radius-lg` 또는 `--radius-xl`
- pill/chip:
  - radius: `--radius-pill`

---

## 5) 신규 디자인 추가 체크리스트

새 화면 또는 컴포넌트를 추가할 때 아래 순서를 따른다.

1. 기존 Semantic Token으로 표현 가능한지 먼저 확인한다.
2. 필요 시 Base Token 추가 후 Semantic Token에 매핑한다.
3. 컴포넌트 코드는 Semantic Token만 사용한다.
4. 상태값(default/hover/focus/disabled/error/loading)에서 토큰 일관성을 검증한다.
5. 접근성(명도 대비, 포커스 표시, 키보드 탐색) 기준을 확인한다.

---

## 6) 현재 기준 토큰 값 (Reference)

### 핵심 색상 (Base)

- `--color-base-blue-500`: `#3B82F6`
- `--color-base-purple-500`: `#8B5CF6`
- `--color-base-green-600`: `#16A34A`
- `--color-base-amber-600`: `#D97706`
- `--color-base-red-600`: `#DC2626`
- `--color-base-slate-900`: `#111827`
- `--color-base-gray-550`: `#717182`
- `--color-base-gray-500`: `#6B7280`
- `--color-base-gray-200`: `#E5E7EB`
- `--color-base-gray-150`: `#ECECF0`
- `--color-base-gray-100`: `#F3F4F6`
- `--color-base-gray-50`: `#FAFAFA`
- `--color-base-white`: `#FFFFFF`

### 기본 타이포그래피

- Display/Heading: `Poppins`
- Body/UI: `Roboto`, fallback `Noto Sans KR`
- Monospace: `Inconsolata`
