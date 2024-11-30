import { User } from "@prisma/client";
import { compare } from "bcryptjs";

import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "@/services/error/invalid-credentials-error";

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  username: User;
}

export class AuthenticateService {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const username = await this.userRepository.findByEmail(email);

    if (!username) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, username.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      username,
    };
  }
}
