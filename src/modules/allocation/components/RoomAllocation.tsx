import { useMemo, useState } from "react";
import styled from "@emotion/styled";

import Alert from "@/modules/common/components/Alert";
import type { Guest } from "@/modules/guest/types";
import type { Room } from "@/modules/room/types";
import {
  calculateRoomPrice,
  fromAllocationToGuest,
  getAllocatedGuest,
  getDefaultRoomAllocation,
  getOcuppiedAllocations,
} from "../utils";
import type { Allocation } from "../types";
import RoomAllocationItem from "./RoomAllocationItem";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 375px;
  margin: auto;
  padding: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 4px;
`;

const RoomItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin-bottom: 12px;
`;

export interface RoomAllocationProps {
  guest: Guest;
  rooms: Room[];
  onChange(result: Allocation[]): void;
}

const RoomAllocation = ({ guest, rooms, onChange }: RoomAllocationProps) => {
  const [allocations, setAllocations] = useState(() =>
    getDefaultRoomAllocation(guest, rooms)
  );

  const remainingGuest = useMemo<Guest>(() => {
    const allocatedGuest = getAllocatedGuest(allocations);

    return {
      adult: guest.adult - allocatedGuest.adult,
      child: guest.child - allocatedGuest.child,
    };
  }, [allocations, guest.adult, guest.child]);

  const handleChange = (guest: Guest, roomIndex: number) => {
    const price = calculateRoomPrice(guest, rooms[roomIndex]);

    const newValue = [
      ...allocations.slice(0, roomIndex),
      { ...guest, price },
      ...allocations.slice(roomIndex + 1),
    ];

    setAllocations(newValue);
    onChange(newValue);
  };

  return (
    <Container>
      <Title>{`住客人數：${guest.adult} 位大人，${guest.child} 位小孩 / ${
        getOcuppiedAllocations(allocations).length
      } 房`}</Title>
      <Alert>
        {`尚未分配人數：${remainingGuest.adult} 位大人，${remainingGuest.child} 位小孩`}
      </Alert>
      <RoomItemContainer>
        {rooms.map((room, index) => (
          <RoomAllocationItem
            key={`room-${index}`}
            title={`房間：${allocations[index].adult + allocations[index].child} 人`}
            current={fromAllocationToGuest(allocations[index])}
            remaining={remainingGuest}
            room={room}
            onChange={(value) => {
              handleChange(value, index);
            }}
          />
        ))}
      </RoomItemContainer>
    </Container>
  );
};

export default RoomAllocation;
