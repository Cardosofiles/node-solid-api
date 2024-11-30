import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "@/services/authenticate";

export function makeAuthenticateService() {
  const userRepository = new PrismaUsersRepository();
  const authenticateService = new AuthenticateService(userRepository);

  return authenticateService;
}
