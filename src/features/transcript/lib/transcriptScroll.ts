/** 스크롤이 맨 아래로 간주되는 여유(px) — 사용자가 위로 올렸는지 판별용 */
export const TRANSCRIPT_SCROLL_BOTTOM_THRESHOLD = 120;

export function isScrollAtBottom(element: HTMLElement, threshold = TRANSCRIPT_SCROLL_BOTTOM_THRESHOLD): boolean {
  return element.scrollHeight - element.scrollTop - element.clientHeight <= threshold;
}
