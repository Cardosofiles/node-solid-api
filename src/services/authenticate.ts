import { User } from "@prisma/client";
import { compare } from "bcryptjs";

import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "@/services/error/invalid-credentials-error";

interface AuthenticationServiceRequest {
  email: string;
  password: string;
}

interface AuthenticationServiceResponse {
  username: User;
}

export class AuthenticationService {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticationServiceRequest): Promise<AuthenticationServiceResponse> {
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
