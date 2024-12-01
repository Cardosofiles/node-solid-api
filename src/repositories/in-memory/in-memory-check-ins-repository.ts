import { CheckIn, Prisma } from "@prisma/client";

import { randomUUID } from "node:crypto";

import { CheckInsRepository } from "@/repositories/check-ins-repository";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];
  async findByUserIdOnDate(userId: string, date: Date) {
    const checkOnSameDate = this.items.find(
      (checkIn) => checkIn.userId === userId
    );

    if (!checkOnSameDate) {
      return null;
    }

    return checkOnSameDate;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      userId: data.userId,
      gym_id: data.gym_id,
      is_validated: data.is_validated ? new Date(data.is_validated) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
