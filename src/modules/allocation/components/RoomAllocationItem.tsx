import styled from "@emotion/styled";

import type { Guest } from "@/modules/guest/types";
import type { Room } from "@/modules/room/types";
import CustomInputNumber from "@/modules/common/components/CustomInputNumber";

const HINT_COLOR = "#8c8c8c";
const BORDER_COLOR = "#d9d9d9";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid ${BORDER_COLOR};

  &:nth-last-of-type(1) {
    border-bottom: none;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h4`
  font-size: 18px;
  margin: 0;
`;

const Label = styled.h5`
  font-size: 16px;
  margin: 0;
`;

const Hint = styled.div`
  font-size: 14px;
  color: ${HINT_COLOR};
`;

interface Props {
  title: string;
  room: Room;
  current: Guest;
  remaining: Guest;
  onChange(value: Guest): void;
}

const RoomItemAllocation = ({ title, room, current, remaining, onChange }: Props) => {
  const remainingCapacity = room.capacity - current.child - current.adult;

  const getMinAdult = () => {
    return current.child > 0 ? 1 : 0;
  }

  const getMaxAdult = () => {
    return current.adult + Math.min(remaining.adult, remainingCapacity);
  };

  const getMaxChild = () => {
    if (current.adult <= 0) return 0;

    return current.child + Math.min(remaining.child, remainingCapacity);
  };

  return (
    <Container>
      <Title>{title}</Title>
      <ContentContainer>
        <Row>
          <LabelContainer>
            <Label>大人</Label>
            <Hint>年齡 20+</Hint>
          </LabelContainer>
          <CustomInputNumber
            value={current.adult}
            min={getMinAdult()}
            max={getMaxAdult()}
            onChange={(e) => {
              onChange({ ...current, adult: Number(e.target.value) || 0 });
            }}
          />
        </Row>
        <Row>
          <Label>小孩</Label>
          <CustomInputNumber
            value={current.child}
            max={getMaxChild()}
            onChange={(e) => {
              onChange({ ...current, child: Number(e.target.value) || 0 });
            }}
          />
        </Row>
      </ContentContainer>
    </Container>
  );
};

export default RoomItemAllocation;
