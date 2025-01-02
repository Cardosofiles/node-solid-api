import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsHistoryService } from "./fetch-user-check-ins-history";

let checkInsRepository: InMemoryCheckInsRepository;
let sutCheckInsService: FetchUserCheckInsHistoryService;

describe("Fetch Check-in History Service", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sutCheckInsService = new FetchUserCheckInsHistoryService(
      checkInsRepository
    );
  });

  // first test
  it("should be able to fetch check-in history", async () => {
    await checkInsRepository.create({
      gym_id: "gym-03",
      userId: "user-01",
    });

    await checkInsRepository.create({
      gym_id: "gym-04",
      userId: "user-01",
    });

    const { checkIns } = await sutCheckInsService.execute({
      userId: "user-01",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-03" }),
      expect.objectContaining({ gym_id: "gym-04" }),
    ]);
  });

  // second test
  it("should be able to fetch paginated check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        userId: "user-01",
      });
    }

    const { checkIns } = await sutCheckInsService.execute({
      userId: "user-01",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
