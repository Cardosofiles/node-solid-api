import { hash } from "bcryptjs";
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

  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (userWithSameEmail) {
    return reply.status(409).send("Email already registered!");
  }

  await prisma.user.create({
    data: { username, email, password_hash },
  });

  return reply.status(201).send("Record created successfully!");
}
