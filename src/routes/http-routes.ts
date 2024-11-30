import { FastifyInstance } from "fastify";

import { authenticate } from "@/routes/controller/authenticate";
import { register } from "@/routes/controller/register";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);
}
