"use client";

import styled from "@emotion/styled";

import RoomAllocation from "@/modules/allocation/components/RoomAllocation";
import type { RoomAllocationProps } from "@/modules/allocation/components/RoomAllocation";
import { MOCK_ALLOCATION_DATA_1 } from "../constants";

const Container = styled.div`
  padding: 40px;
`;

const RoomAllocationView = () => {
  const handleChange: RoomAllocationProps["onChange"] = (result) => {
    console.log(result);
  };

  return (
    <Container>
      <RoomAllocation
        guest={MOCK_ALLOCATION_DATA_1.guest}
        rooms={MOCK_ALLOCATION_DATA_1.rooms}
        onChange={handleChange}
      />
    </Container>
  );
};

export default RoomAllocationView;
