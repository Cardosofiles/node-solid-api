import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymsService } from "@/services/search-gyms";
export function makeSearchGymsService() {
  const gymsRepository = new PrismaGymsRepository();
  const Service = new SearchGymsService(gymsRepository);
  return Service;
}
