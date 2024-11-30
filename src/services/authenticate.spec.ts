import { hash } from "bcryptjs";
import { describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticationService } from "./authenticate";
import { InvalidCredentialsError } from "./error/invalid-credentials-error";

describe("Authenticate Service", () => {
  // first test
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sutAuthenticateService = new AuthenticationService(usersRepository);

    await usersRepository.create({
      username: "testUser",
      email: "cardoso1234@outlook.com",
      password_hash: await hash("123456", 6),
    });

    const { username } = await sutAuthenticateService.execute({
      email: "cardoso1234@outlook.com",
      password: "123456",
    });

    expect(username.id).toEqual(expect.any(String));
  });

  // second test
  it("should not be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sutAuthenticateService = new AuthenticationService(usersRepository);

    await expect(() =>
      sutAuthenticateService.execute({
        email: "wrong_email@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  // third test
  it("should not be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sutAuthenticateService = new AuthenticationService(usersRepository);

    await usersRepository.create({
      username: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    expect(() =>
      sutAuthenticateService.execute({
        email: "johndoe@example.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
