import { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";

import { prisma } from "@/lib/prisma";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }
  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: { userId: userId },
    });

    return count;
  }
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: { id },
    });

    return checkIn;
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        userId: userId,
        created_at: {
          gte: startOfDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return checkIn;
  }
  async findManyByUserId(userId: string, page: number) {
    const checkIn = await prisma.checkIn.findMany({
      where: { userId: userId },
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkIn;
  }
  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: { id: data.id },
      data: data,
    });
    return checkIn;
  }
}
