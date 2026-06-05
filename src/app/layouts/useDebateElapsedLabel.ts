import { formatElapsedTime } from "@/features/transcript/lib/formatElapsedTime";
import { useEffect, useMemo, useState } from "react";

export type UseDebateElapsedLabelOptions = {
  /** DEBATE_START 수신 시각(ms). null이면 00:00 */
  startedAt: number | null;
  /** true일 때 1초 간격 갱신, false이면 마지막 경과 시각에 고정 */
  running: boolean;
};

export function useDebateElapsedLabel({ startedAt, running }: UseDebateElapsedLabelOptions): string {
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    if (!running || startedAt == null) {
      return;
    }

    const syncNow = () => {
      setNowMs(Date.now());
    };

    syncNow();
    const intervalId = window.setInterval(syncNow, 1_000);

    return () => {
      window.clearInterval(intervalId);
      syncNow();
    };
  }, [running, startedAt]);

  return useMemo(() => {
    if (startedAt == null) {
      return "00:00";
    }

    const elapsedSeconds = Math.max(0, Math.floor((nowMs - startedAt) / 1_000));
    return formatElapsedTime(elapsedSeconds);
  }, [startedAt, nowMs]);
}
