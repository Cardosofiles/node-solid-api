import { hash } from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";

interface ServiceRegisterRequest {
  username: string;
  email: string;
  password: string;
}

export async function registerService({
  email,
  password,
  username,
}: ServiceRegisterRequest) {
  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (userWithSameEmail) {
    throw new Error(`User ${userWithSameEmail} already exists`);
  }

  const prismaUsersRepository = new PrismaUsersRepository();

  await prismaUsersRepository.create({
    username,
    email,
    password_hash,
  });
}
