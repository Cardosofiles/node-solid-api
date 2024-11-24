import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

export const app = fastify();

app.addHook("preHandler", async (request) => {
  console.log(`[${request.method}] ${request.url}`);
});

const prisma = new PrismaClient();
prisma.user.create({
  data: {
    username: "Cardoso Files",
    email: "cardosofiles@outlook.com",
  },
});
