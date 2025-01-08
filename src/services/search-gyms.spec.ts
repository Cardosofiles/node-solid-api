import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsService } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sutCheckInsService: SearchGymsService;

describe("Search Gyms Service", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sutCheckInsService = new SearchGymsService(gymsRepository);
  });

  // first test
  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "TypeScript Gym",
      description: "Logic",
      phone: null,
      latitude: 123.456,
      longitude: 789.012,
    });

    await gymsRepository.create({
      title: "NodeJS Gym",
      description: "Services",
      phone: null,
      latitude: 123.456,
      longitude: 789.012,
    });

    const { gyms } = await sutCheckInsService.execute({
      query: "TypeScript Gym",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "TypeScript Gym" }),
    ]);
  });

  //second test
  it("should be able to search for gyms with pagination", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: 123.456,
        longitude: 789.012,
      });
    }

    const { gyms } = await sutCheckInsService.execute({
      query: "JavaScript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym 21" }),
      expect.objectContaining({ title: "JavaScript Gym 22" }),
    ]);
  });
});
