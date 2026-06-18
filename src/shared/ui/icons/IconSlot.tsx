import styled from "@emotion/styled";

export const IconSlot = styled.span<{ $size: number | string }>`
  display: inline-flex;
  flex-shrink: 0;
  width: ${({ $size }) => (typeof $size === "number" ? `${$size}px` : $size)};
  height: ${({ $size }) => (typeof $size === "number" ? `${$size}px` : $size)};

  & > svg {
    width: 100%;
    height: 100%;
  }
`;
