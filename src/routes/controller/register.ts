import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { UserAlreadyExistsError } from "@/services/error/user-already-exists-error";
import { makeRegisterService } from "@/services/factories/make-register-service";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { username, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerService = makeRegisterService();

    await registerService.execute({
      email,
      password,
      username,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send("Record created successfully!");
}
