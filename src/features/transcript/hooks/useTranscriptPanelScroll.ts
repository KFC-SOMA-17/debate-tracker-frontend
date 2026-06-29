import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { isScrollAtBottom } from "../lib/transcriptScroll";

export type UseTranscriptPanelScrollOptions = {
  /** 세그먼트 개수 — append·새 발화 버튼 판별 */
  itemCount: number;
  /** 동일 카드 내 문장 갱신(REFINED·같은 화자 병합) 시 스크롤 재계산 */
  contentRevision?: string;
  enabled: boolean;
};

export type UseTranscriptPanelScrollResult = {
  listRef: RefObject<HTMLDivElement | null>;
  showNewUtterancesButton: boolean;
  handleScroll: () => void;
  scrollToBottom: () => void;
};

function scrollListToBottom(list: HTMLDivElement, behavior: ScrollBehavior = "smooth") {
  list.scrollTo({ top: list.scrollHeight, behavior });
}

export function useTranscriptPanelScroll({
  itemCount,
  contentRevision = "",
  enabled,
}: UseTranscriptPanelScrollOptions): UseTranscriptPanelScrollResult {
  const listRef = useRef<HTMLDivElement>(null);
  const prevItemCountRef = useRef(0);
  const prevContentRevisionRef = useRef("");
  /** effect(자동 스크롤)에서 최신 pinned 값 참조용 */
  const isPinnedToBottomRef = useRef(true);
  const [isPinnedToBottom, setIsPinnedToBottom] = useState(true);
  const [lastSeenCount, setLastSeenCount] = useState(0);

  const scrollActive = enabled && itemCount > 0;

  const [prevScrollActive, setPrevScrollActive] = useState(scrollActive);
  if (scrollActive !== prevScrollActive) {
    setPrevScrollActive(scrollActive);
    setIsPinnedToBottom(true);
    setLastSeenCount(0);
  }

  useEffect(() => {
    isPinnedToBottomRef.current = isPinnedToBottom;
  }, [isPinnedToBottom]);

  const showNewUtterancesButton =
    scrollActive && itemCount > lastSeenCount && !isPinnedToBottom;

  const setPinned = useCallback((pinned: boolean) => {
    isPinnedToBottomRef.current = pinned;
    setIsPinnedToBottom(pinned);
  }, []);

  const scrollToBottom = useCallback(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }
    scrollListToBottom(list);
    setPinned(true);
    setLastSeenCount(itemCount);
  }, [itemCount, setPinned]);

  const handleScroll = useCallback(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }

    const pinned = isScrollAtBottom(list);
    setPinned(pinned);
    if (pinned) {
      setLastSeenCount(itemCount);
    }
  }, [itemCount, setPinned]);

  useEffect(() => {
    if (!scrollActive) {
      prevItemCountRef.current = 0;
      prevContentRevisionRef.current = "";
      isPinnedToBottomRef.current = true;
      return;
    }

    const list = listRef.current;
    const itemCountGrew = itemCount > prevItemCountRef.current;
    const contentChanged = contentRevision !== prevContentRevisionRef.current;
    prevItemCountRef.current = itemCount;
    prevContentRevisionRef.current = contentRevision;

    if ((!itemCountGrew && !contentChanged) || !list) {
      return;
    }

    if (isPinnedToBottomRef.current) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollListToBottom(list);
          isPinnedToBottomRef.current = true;
          setLastSeenCount(itemCount);
        });
      });
    }
  }, [scrollActive, itemCount, contentRevision]);

  return {
    listRef,
    showNewUtterancesButton,
    handleScroll,
    scrollToBottom,
  };
}
