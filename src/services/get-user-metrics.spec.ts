import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricService } from "./get-user-metrics";

let checkInsRepository: InMemoryCheckInsRepository;
let sutCheckInsService: GetUserMetricService;

describe("Get User Metrics Service", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sutCheckInsService = new GetUserMetricService(checkInsRepository);
  });

  // first test
  it("should be able to get check-ins count from metrics", async () => {
    await checkInsRepository.create({
      gym_id: "gym-03",
      userId: "user-01",
    });

    await checkInsRepository.create({
      gym_id: "gym-04",
      userId: "user-01",
    });

    const { checkInsCount } = await sutCheckInsService.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(2);
  });
});
