import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 조건부 클래스를 합치고, Tailwind 충돌 클래스는 뒤쪽 값이 이기도록 병합
 */
export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(classes));
}
