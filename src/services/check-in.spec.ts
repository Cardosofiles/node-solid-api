import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInService } from "@/services/check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let sutCheckInsService: CheckInService;

describe("Check-in Service", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sutCheckInsService = new CheckInService(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // first test
  it("should be able to check in", async () => {
    const { checkIn } = await sutCheckInsService.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  // second test
  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2024, 10, 20, 8, 0, 0));

    await sutCheckInsService.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    await expect(() =>
      sutCheckInsService.execute({
        gymId: "gym-01",
        userId: "user-01",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
