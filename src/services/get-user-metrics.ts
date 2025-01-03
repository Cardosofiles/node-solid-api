import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface GetUserMetricServiceRequest {
  userId: string;
}

interface GetUserMetricServiceResponse {
  checkInsCount: number;
}

export class GetUserMetricService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricServiceRequest): Promise<GetUserMetricServiceResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return {
      checkInsCount,
    };
  }
}
