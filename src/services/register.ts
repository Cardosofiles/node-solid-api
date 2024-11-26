import { User } from "@prisma/client";
import { hash } from "bcryptjs";

import { UsersRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "./error/user-already-exists-error";

interface ServiceRegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface ServiceRegisterResponse {
  user: User;
}

export class RegisterService {
  constructor(private userRepository: UsersRepository) {}
  async execute({
    email,
    password,
    username,
  }: ServiceRegisterRequest): Promise<ServiceRegisterResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.userRepository.create({
      username,
      email,
      password_hash,
    });

    return { user };
  }
}
