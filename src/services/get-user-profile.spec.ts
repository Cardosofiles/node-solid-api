import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "@/services/error/resource-not-found-error";
import { GetUserProfileService } from "@/services/get-user-profile";

let usersRepository: InMemoryUsersRepository;
let sutGetUserProfileService: GetUserProfileService;

describe("Get User Profile Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sutGetUserProfileService = new GetUserProfileService(usersRepository);
  });

  // first test
  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      username: "testUser",
      email: "cardoso1235@outlook.com",
      password_hash: await hash("123456", 6),
    });

    const { username } = await sutGetUserProfileService.execute({
      userId: createdUser.id,
    });

    expect(username.id).toEqual(expect.any(String));
    expect(username.username).toEqual(expect.any(String));
  });

  // second test
  it("should not be able to get user with wrong id", async () => {
    await expect(() =>
      sutGetUserProfileService.execute({
        userId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
