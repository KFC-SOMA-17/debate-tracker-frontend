# Design Tokens

Debate Tracker · Clean Theme Design System

---

## Color Tokens

### Primary Colors

| Token Name    | Hex Code  | Usage                                                |
| ------------- | --------- | ---------------------------------------------------- |
| **Primary**   | `#3B82F6` | 주요 버튼, active navigation, 강조 링크, 실시간 상태 |
| **Secondary** | `#8B5CF6` | 반대 측 색상, 보조 강조 요소                         |
| **Success**   | `#16A34A` | 성공 상태, 녹음 정상, 긍정 피드백                    |
| **Warning**   | `#D97706` | 경고 상태, 주의 메시지                               |
| **Danger**    | `#DC2626` | 위험 액션, 토론 종료, 삭제 버튼                      |

### Background & Surface

| Token Name     | Hex Code  | Usage                           |
| -------------- | --------- | ------------------------------- |
| **Surface**    | `#FFFFFF` | 카드 배경, 패널 배경, 모달 배경 |
| **Background** | `#FAFAFA` | 페이지 전체 배경                |
| **Muted**      | `#F3F4F6` | Hover 배경, 비활성 요소 배경    |

### Text Colors

| Token Name         | Hex Code  | Usage                      |
| ------------------ | --------- | -------------------------- |
| **Text Primary**   | `#111827` | 본문, 제목, 주요 텍스트    |
| **Text Secondary** | `#6B7280` | 부가 설명, 라벨, 메타 정보 |

### Border & Dividers

| Token Name | Hex Code  | Usage                          |
| ---------- | --------- | ------------------------------ |
| **Border** | `#E5E7EB` | 카드 테두리, 구분선, 패널 경계 |

### Soft Colors

| Token Name       | Hex Code  | Opacity | Usage                                 |
| ---------------- | --------- | ------- | ------------------------------------- |
| **Primary Soft** | `#3B82F6` | 10%     | 실시간 카드 배경, Primary accent 영역 |

---

## Typography

### Font Families

- **Display / Heading**: Poppins
- **Body / UI**: Roboto
- **Monospace**: Inconsolata

### Typography Scale

| Style Name               | Font Family | Size | Weight | Line Height | Usage                             |
| ------------------------ | ----------- | ---- | ------ | ----------- | --------------------------------- |
| **Display / Page Title** | Poppins     | 32px | 600    | 1.3         | 서비스명, 메인 타이틀             |
| **Heading 1**            | Poppins     | 24px | 600    | 1.4         | 페이지 제목, 모달 타이틀          |
| **Heading 2**            | Poppins     | 20px | 600    | 1.4         | 섹션 제목, 주요 강조 텍스트       |
| **Section Title**        | Roboto      | 18px | 500    | 1.5         | 패널 제목, 카드 헤더              |
| **Body**                 | Roboto      | 14px | 400    | 1.6         | 본문, 발화 내용, 근거 텍스트      |
| **Caption**              | Roboto      | 12px | 400    | 1.5         | 메타 정보, 부가 설명, 힌트 텍스트 |
| **Label**                | Roboto      | 13px | 500    | 1.5         | 버튼 레이블, 탭 텍스트, 상태 표시 |
| **Monospace Label**      | Inconsolata | 12px | 500    | 1.5         | 시간 표시, 코드, 시스템 정보      |

### Typography Examples

- **Display**: "Debate Tracker"
- **Heading 1**: "메인 대시보드"
- **Heading 2**: "실시간 속기록"
- **Section Title**: "쟁점별 요약"
- **Body**: "AI 창작물은 인간의 의도를 확장하는 도구를 통해 만들어진 결과물이므로 예술로 볼 수 있습니다."
- **Caption**: "드래그로 이동 · 휠로 확대/축소"
- **Label**: "토론 진행 중"
- **Monospace**: "24:18 · S1"

---

## Spacing Scale

| Value    | Usage                               |
| -------- | ----------------------------------- |
| **8px**  | 작은 간격, 아이콘-텍스트, chip 내부 |
| **16px** | 중간 간격, 카드 padding, 요소 간격  |
| **24px** | 큰 간격, 섹션 간격, 패널 여백       |
| **32px** | 페이지 상단, 큰 섹션 구분           |

---

## Border Radius

| Value     | Usage                    |
| --------- | ------------------------ |
| **4px**   | Chip, Small Badge        |
| **8px**   | Button, Card, Input      |
| **12px**  | Modal, Panel, Large Card |
| **999px** | Pill, Full Round         |
