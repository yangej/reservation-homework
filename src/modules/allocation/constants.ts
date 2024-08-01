import type { Guest } from "../guest/types";
import type { Room } from "../room/types";

type MockAllocationData = {
    guest: Guest;
    rooms: Room[]
}

export const MOCK_ALLOCATION_DATA_1: MockAllocationData = {
  guest: { adult: 4, child: 2 },
  rooms: [
    { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
    { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
    { roomPrice: 500, adultPrice: 300, childPrice: 200, capacity: 4 },
  ],
};

export const MOCK_ALLOCATION_DATA_2: MockAllocationData = {
  guest: { adult: 16, child: 0 },
  rooms: [
    { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
    { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
    { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
    { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
  ],
};
