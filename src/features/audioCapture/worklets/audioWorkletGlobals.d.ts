/**
 * AudioWorkletGlobalScope globals (main-thread DOM lib does not declare these).
 * @see https://developer.mozilla.org/docs/Web/API/AudioWorkletGlobalScope/registerProcessor
 */
declare class AudioWorkletProcessor {
  readonly port: MessagePort;

  constructor(options?: AudioWorkletNodeOptions);

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ): boolean;
}

declare function registerProcessor(
  name: string,
  processorCtor: new (options?: AudioWorkletNodeOptions) => AudioWorkletProcessor,
): void;

interface AudioWorkletNodeOptions {
  numberOfInputs?: number;
  numberOfOutputs?: number;
  outputChannelCount?: number[];
  parameterData?: Record<string, Float32Array>;
  processorOptions?: unknown;
}
