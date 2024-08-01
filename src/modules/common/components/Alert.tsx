import styled from "@emotion/styled";
import type { CSSProperties, ReactNode } from "react";

type AlertType = "success" | "info" | "warning" | "danger";

const ColorMap: Record<AlertType, CSSProperties> = {
  success: {
    borderColor: "#b7eb8f",
    backgroundColor: "#f6ffed",
  },
  info: {
    borderColor: "#91caff",
    backgroundColor: "#e6f4ff",
  },
  warning: {
    borderColor: "#ffe58f",
    backgroundColor: "#fffbe6",
  },
  danger: {
    borderColor: "#ffccc7",
    backgroundColor: "#fff2f0",
  },
};

const Container = styled.div<{ $type: AlertType }>((props) => ({
  ...ColorMap[props.$type],
  fontSize: '14px',
  padding: "14px",
  borderRadius: '4px',
  borderStyle: 'solid',
  borderWidth: '1px',
  marginBottom: '10px'
}));

interface Props {
  type?: AlertType;
  children: ReactNode;
}

const Alert = ({ type = 'info', children }: Props) => {
  return <Container $type={type}>{children}</Container>;
};

export default Alert;
