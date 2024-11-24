import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { username, email, password } = registerBodySchema.parse(request.body);

  await prisma.user.create({
    data: { username, email, password_hash: password },
  });

  return reply.status(201).send("Record created successfully!");
}
