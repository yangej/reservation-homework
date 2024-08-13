'use client'

import styled from "@emotion/styled";
import { ChangeEventHandler, FocusEventHandler, useRef } from "react";
import PlusIcon from "./PlusIcon";
import MinusIcon from "./MinusIcon";

const PRIMARY_COLOR = "#69b1ff";
const NEUTRAL_COLOR = "#d9d9d9";
const DISABLED_COLOR = "#8c8c8c";

const STEP_INTERVAL = 150;

const Container = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  font-size: 16px;
  color: ${PRIMARY_COLOR};
  background-color: white;
  border: 1px solid ${PRIMARY_COLOR};
  border-radius: 4px;

  &:disabled {
    border: 1px solid ${DISABLED_COLOR};
  }
`;

const Input = styled.input`
  width: 48px;
  height: 48px;
  font-size: 16px;
  text-align: center;
  border: 1px solid ${NEUTRAL_COLOR};
  border-radius: 4px;

  &::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:disabled {
    color: ${DISABLED_COLOR};
  }
`;

interface Props {
  value: number;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?(): FocusEventHandler<HTMLInputElement>;
}

const CustomInputNumber = ({
  name,
  value,
  min = 0,
  max = Infinity,
  step = 1,
  disabled = false,
  onChange,
  onBlur,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const isDecreaseButtonDisabled = disabled || value <= min;
  const isIncreaseButtonDisabled = disabled || value >= max;

  const handleIncrease = () => {
    inputRef.current?.stepUp();
  };

  const handleDecrease = () => {
    inputRef.current?.stepDown();
  };

  const createPressStartHandler = (fn: () => void) => {
    return () => {
      function loop() {
        clearTimeout(timerRef.current);
        
        fn();

        timerRef.current = setTimeout(loop, STEP_INTERVAL);
      }

      loop();
    }
  }

  const handlePressIncreaseStart = createPressStartHandler(handleIncrease);
  const handlePressDecreaseStart = createPressStartHandler(handleDecrease);

  const handlePressEnd = () => {
    clearTimeout(timerRef.current);
    inputRef.current?.dispatchEvent(new Event("input", { bubbles: true }));
  };

  return (
    <Container>
      <Button
        type="button"
        disabled={isDecreaseButtonDisabled}
        onMouseDown={handlePressDecreaseStart}
        onMouseUp={handlePressEnd}
        onTouchStart={handlePressDecreaseStart}
        onTouchEnd={handlePressEnd}
      >
        <MinusIcon
          $color={isDecreaseButtonDisabled ? DISABLED_COLOR : PRIMARY_COLOR}
        />
      </Button>
      <Input
        ref={inputRef}
        type="number"
        inputMode="numeric"
        name={name}
        value={value}
        step={step}
        min={min}
        max={max}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
      />
      <Button
        type="button"
        disabled={isIncreaseButtonDisabled}
        onMouseDown={handlePressIncreaseStart}
        onMouseUp={handlePressEnd}
        onTouchStart={handlePressIncreaseStart}
        onTouchEnd={handlePressEnd}
      >
        <PlusIcon
          $color={isIncreaseButtonDisabled ? DISABLED_COLOR : PRIMARY_COLOR}
        />
      </Button>
    </Container>
  );
};

export default CustomInputNumber;