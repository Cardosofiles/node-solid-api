import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymService } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sutRegisterService: CreateGymService;

describe("Create Gym Service", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sutRegisterService = new CreateGymService(gymsRepository);
  });

  // first test
  it("should should be able to create gym", async () => {
    const { gym } = await sutRegisterService.execute({
      title: "Test Gym",
      description: "Test Description",
      phone: "+55 11 99999-9999",
      latitude: 123.456,
      longitude: 789.012,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
