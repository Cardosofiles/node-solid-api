import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { FetchUserCheckInsHistoryService } from "@/services/fetch-user-check-ins-history";
export function makeFetchUserCheckInsHistoryService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const Service = new FetchUserCheckInsHistoryService(checkInsRepository);
  return Service;
}
