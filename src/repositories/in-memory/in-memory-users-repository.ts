import { Prisma, User } from "@prisma/client";

import { UsersRepository } from "@/repositories/users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];
  //<<<<<<< Tabnine <<<<<<<
  /**
   * Finds a user by their email address in the in-memory repository.//+
   *+
   * @param email - The email address of the user to find.//+
   * @returns The user with the specified email address, or `null` if no user is found.//+
   */ //+
  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
  //>>>>>>> Tabnine >>>>>>>// {"conversationId":"863b2b2d-0eb1-4ba1-becf-3d7a59843b01","source":"instruct"}
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: "user-1",
      email: data.email,
      username: data.username,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
}
