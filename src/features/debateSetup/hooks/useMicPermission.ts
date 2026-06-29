import { useCallback, useState } from "react";
import { getUserMediaAudioConstraints } from "@/features/audioCapture/constants/audioProcessing";
import type { MicPermissionState } from "@/features/audioCapture/types/audioCapture";

function mapMicError(error: unknown): MicPermissionState {
  if (error instanceof DOMException) {
    if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
      return "denied";
    }
    if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
      return "not_found";
    }
  }
  return "error";
}

function getMicPermissionMessage(state: MicPermissionState): string | null {
  switch (state) {
    case "denied":
      return "마이크 권한이 거부되었습니다. 브라우저 설정에서 권한을 허용해 주세요.";
    case "not_found":
      return "마이크를 찾을 수 없습니다.";
    case "error":
      return "마이크 권한을 확인할 수 없습니다. 잠시 후 다시 시도해 주세요.";
    default:
      return null;
  }
}

async function queryMicPermissionState(): Promise<MicPermissionState | null> {
  if (!navigator.permissions?.query) {
    return null;
  }

  try {
    const result = await navigator.permissions.query({ name: "microphone" as PermissionName });

    switch (result.state) {
      case "granted":
        return "granted";
      case "denied":
        return "denied";
      case "prompt":
        return "unknown";
      default:
        return "unknown";
    }
  } catch {
    return null;
  }
}

export function useMicPermission() {
  const [micPermission, setMicPermission] = useState<MicPermissionState>("unknown");
  const [micErrorMessage, setMicErrorMessage] = useState<string | null>(null);

  const applyMicPermissionState = useCallback((state: MicPermissionState) => {
    setMicPermission(state);
    setMicErrorMessage(getMicPermissionMessage(state));
  }, []);

  const checkMicPermission = useCallback(async () => {
    const queried = await queryMicPermissionState();
    if (queried === null) {
      return;
    }

    applyMicPermissionState(queried);
  }, [applyMicPermissionState]);

  const requestMicPermission = useCallback(async () => {
    setMicPermission("prompting");
    setMicErrorMessage(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: getUserMediaAudioConstraints(),
      });
      stream.getTracks().forEach(track => track.stop());
      applyMicPermissionState("granted");
    } catch (caught) {
      applyMicPermissionState(mapMicError(caught));
    }
  }, [applyMicPermissionState]);

  return {
    micPermission,
    micErrorMessage,
    isRequestingMic: micPermission === "prompting",
    checkMicPermission,
    requestMicPermission,
  };
}