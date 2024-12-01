import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "@/services/error/user-already-exists-error";
import { RegisterService } from "@/services/register";

let usersRepository: InMemoryUsersRepository;
let sutRegisterService: RegisterService;

describe("Register Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sutRegisterService = new RegisterService(usersRepository);
  });

  // first test
  it("should hash user password upon registration", async () => {
    const { user } = await sutRegisterService.execute({
      email: "cardoso123@outlook.com",
      password: "test123",
      username: "testUser",
    });

    const isPasswordCorrectlyHashed = await compare(
      "test123",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  // second test
  it("should not be able to register with email twice", async () => {
    const email = "test_unit@example.com";

    await sutRegisterService.execute({
      email,
      password: "test123",
      username: "testUser",
    });

    await expect(() =>
      sutRegisterService.execute({
        email,
        password: "test123",
        username: "testUser",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  // third test
  it("should be able to register", async () => {
    const { user } = await sutRegisterService.execute({
      email: "cardoso123@outlook.com",
      password: "test123",
      username: "testUser",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
