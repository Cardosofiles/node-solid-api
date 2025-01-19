import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserMetricService } from "@/services/get-user-metrics";
export function makeGetUserMetricsService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const Service = new GetUserMetricService(checkInsRepository);
  return Service;
}
