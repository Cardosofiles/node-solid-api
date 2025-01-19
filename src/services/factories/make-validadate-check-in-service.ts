import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckInService } from "@/services/validate-check-in";
export function makeValidateCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const Service = new ValidateCheckInService(checkInsRepository);
  return Service;
}
