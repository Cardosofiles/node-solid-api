import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { registerService } from "@/services/register";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { username, email, password } = registerBodySchema.parse(request.body);

  try {
    await registerService({
      email,
      password,
      username,
    });
  } catch (err) {
    return reply.status(409).send(`Email ${email} already registered! ⚠️`);
  }

  return reply.status(201).send("Record created successfully!");
}
