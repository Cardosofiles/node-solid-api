import { Decimal } from "@prisma/client/runtime/library";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CheckInService } from "@/services/check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sutCheckInsService: CheckInService;

const userLatitude = -18.9659894;
const userLongitude = -48.2692181;
const gymLatitude = -18.956255;
const gymLongitude = -48.2934849;

describe("Check-in Service", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sutCheckInsService = new CheckInService(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: "gym-01",
      title: "TypeScript Academy",
      phone: "",
      description: "",
      latitude: new Decimal(userLatitude),
      longitude: new Decimal(userLongitude),
    });

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
      userLatitude: userLatitude,
      userLongitude: userLongitude,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  // second test
  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sutCheckInsService.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: userLatitude,
      userLongitude: userLongitude,
    });

    await expect(() =>
      sutCheckInsService.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: userLatitude,
        userLongitude: userLongitude,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  // third test
  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    await sutCheckInsService.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: userLatitude,
      userLongitude: userLongitude,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));
    const { checkIn } = await sutCheckInsService.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: userLatitude,
      userLongitude: userLongitude,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });

  // fourth test
  it("should not be able to check in distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "React Academy",
      phone: "",
      description: "",
      latitude: new Decimal(gymLatitude),
      longitude: new Decimal(gymLongitude),
    });

    await expect(() =>
      sutCheckInsService.execute({
        gymId: "gym-02",
        userId: "user-02",
        userLatitude: userLatitude,
        userLongitude: userLongitude,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
