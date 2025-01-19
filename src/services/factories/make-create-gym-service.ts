import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CreateGymService } from "@/services/create-gym";
export function makeCreateGymService() {
  const gymsRepository = new PrismaGymsRepository();
  const Service = new CreateGymService(gymsRepository);
  return Service;
}
