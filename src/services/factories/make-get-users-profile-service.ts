import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileService } from "@/services/get-user-profile";
export function makeGetUserProfileService() {
  const usersRepository = new PrismaUsersRepository();
  const Service = new GetUserProfileService(usersRepository);
  return Service;
}
