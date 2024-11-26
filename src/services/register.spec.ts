import { describe, it } from "vitest";

import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterService } from "./register";

describe("Register Service", () => {
  it("should hash user password upon registration", async () => {
    const prismaUserRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(prismaUserRepository);

    await registerService.execute({
      email: "test@example.com",
      password: "test123",
      username: "testUser",
    });
  });
});
