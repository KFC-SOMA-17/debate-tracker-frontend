import "@emotion/react";
import type { AppTheme } from "./theme";

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- Emotion theme augmentation
  export interface Theme extends AppTheme {}
}
