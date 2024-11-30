import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { RegisterService } from "@/services/register";
import { UserAlreadyExistsError } from "./error/user-already-exists-error";

describe("Register Service", () => {
  // first test
  it("should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository);

    const { user } = await registerService.execute({
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
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository);

    const email = "test_unit@example.com";

    await registerService.execute({
      email,
      password: "test123",
      username: "testUser",
    });

    await expect(() =>
      registerService.execute({
        email,
        password: "test123",
        username: "testUser",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  // third test
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository);

    const { user } = await registerService.execute({
      email: "cardoso123@outlook.com",
      password: "test123",
      username: "testUser",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
