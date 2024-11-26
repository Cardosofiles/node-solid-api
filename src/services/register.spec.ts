import { compare } from "bcryptjs";

import { describe, expect, it } from "vitest";

import { RegisterService } from "./register";

describe("Register Service", () => {
  it("should hash user password upon registration", async () => {
    const registerService = new RegisterService({
      async findByEmail(email) {
        return null;
      },

      async create(data) {
        return {
          id: "user-1",
          email: data.email,
          username: data.username,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    });

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
});
