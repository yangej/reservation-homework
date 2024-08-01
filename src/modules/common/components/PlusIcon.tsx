import styled from "@emotion/styled";

const DEFUALT_SIZE = 24;

const PlusIcon = styled.div<{ $color?: string; $size?: number }>`
  position: relative;
  width: ${(props) => props.$size ?? DEFUALT_SIZE}px;
  height: ${(props) => props.$size ?? DEFUALT_SIZE}px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.$color ?? "#d9d9d9"};
  }

  &::before {
    transform: translate(-50%, -50%) rotate(90deg);
  }

  &::after {
    transform: translate(-50%, -50%);
  }
`;

export default PlusIcon;
