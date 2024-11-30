import { User } from "@prisma/client";

import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "@/services/error/resource-not-found-error";

interface GetUserProfileServiceRequest {
  userId: string;
}

interface GetUserProfileServiceResponse {
  username: User;
}

export class GetUserProfileService {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
    const username = await this.userRepository.findById(userId);

    if (!username) {
      throw new ResourceNotFoundError();
    }

    return {
      username,
    };
  }
}
