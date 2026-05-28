/**
 * 클래스 이름 배열을 결합하여 문자열로 반환합니다. Tailwind CSS의 `cn` 함수를 래핑합니다.
 * @param classes - 클래스 이름 배열
 * @returns 클래스 이름 문자열
 */

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
