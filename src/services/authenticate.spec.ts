import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateService } from "@/services/authenticate";
import { InvalidCredentialsError } from "@/services/error/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sutAuthenticateService: AuthenticateService;

describe("Authenticate Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sutAuthenticateService = new AuthenticateService(usersRepository);
  });

  // first test
  it("should be able to authenticate", async () => {
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
    await expect(() =>
      sutAuthenticateService.execute({
        email: "wrong_email@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  // third test
  it("should not be able to authenticate with wrong email", async () => {
    await usersRepository.create({
      username: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sutAuthenticateService.execute({
        email: "johndoe@example.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
