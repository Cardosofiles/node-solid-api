import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyService } from "@/services/fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sutCheckInsService: FetchNearbyService;

describe("Fetch Nearby Gyms Service", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sutCheckInsService = new FetchNearbyService(gymsRepository);
  });

  // first test
  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "TypeScript Gym",
      description: "Logic",
      phone: null,
      latitude: -18.8773295,
      longitude: -48.2486748,
    });

    await gymsRepository.create({
      title: "NodeJS Gym",
      description: "Services",
      phone: null,
      latitude: -18.9659894,
      longitude: -48.2692181,
    });

    const { gyms } = await sutCheckInsService.execute({
      userLatitude: -18.9659894,
      userLongitude: -48.2692181,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "NodeJS Gym" })]);
  });
});
