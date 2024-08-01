import { pick } from "../common/utils";
import type { Guest } from "../guest/types";
import type { Room } from "../room/types";
import type { Allocation } from "./types";

const DEFAULT_ALLOCATION: Allocation = {
  adult: 0,
  child: 0,
  price: 0,
};

export const calculateRoomPrice = (guest: Guest, room: Room) => {
  if (guest.adult === 0 && guest.child === 0) return 0;

  return (
    guest.adult * room.adultPrice +
    guest.child * room.childPrice +
    room.roomPrice
  );
};

export const getDefaultRoomAllocation = (guest: Guest, rooms: Room[]) => {
  let result: Allocation[] = [];
  let minTotal = Infinity;

  const allocate = (
    currentAllocations: Allocation[],
    remainingAdults: number,
    remainingChildren: number,
    currentRoomIndex: number
  ) => {
    // Calculate the total if the allocation has done
    if (currentRoomIndex === rooms.length) {
      if (remainingAdults === 0 && remainingChildren === 0) {
        const currentTotal = currentAllocations.reduce(
          (acc, cur) => acc + cur.price,
          0
        );

        // Store result if the total is lower than any previous results
        if (currentTotal <= minTotal) {
          minTotal = currentTotal;
          result = currentAllocations;
        }
      }

      return;
    }

    // Try to allocate with the current room
    const currentRoom = rooms[currentRoomIndex];
    for (
      let adults = 0;
      adults <= Math.min(remainingAdults, currentRoom.capacity);
      adults++
    ) {
      for (
        let children = 0;
        children <= Math.min(remainingChildren, currentRoom.capacity - adults);
        children++
      ) {
        // Not to allocate if there's no adults but children
        if (children > 0 && adults === 0) continue;

        const price = calculateRoomPrice(
          { adult: adults, child: children },
          currentRoom
        );
        const allocation: Allocation = {
          adult: adults,
          child: children,
          price,
        };
        const nextAllocations = [
          ...currentAllocations.slice(0, currentRoomIndex),
          allocation,
          ...currentAllocations.slice(currentRoomIndex + 1),
        ];

        allocate(
          nextAllocations,
          remainingAdults - adults,
          remainingChildren - children,
          currentRoomIndex + 1
        );
      }
    }
  };

  // Start allocation with the initial values
  const initialAllocation = Array<Allocation>(rooms.length).fill(
    DEFAULT_ALLOCATION
  );
  allocate(initialAllocation, guest.adult, guest.child, 0);

  return minTotal === Infinity ? initialAllocation : result;
};

export const getAllocatedGuest = (allocations: Allocation[]): Guest => {
  return allocations.reduce<Guest>(
    (acc, cur) => ({
      adult: acc.adult + cur.adult,
      child: acc.child + cur.child,
    }),
    { adult: 0, child: 0 }
  );
};

export const getOcuppiedAllocations = (allocations: Allocation[]) => {
  return allocations.filter(
    (allocation) => allocation.adult > 0 || allocation.child > 0
  );
};

export const fromAllocationToGuest = (allocation: Allocation): Guest => {
  return pick(allocation, ["adult", "child"]);
};
