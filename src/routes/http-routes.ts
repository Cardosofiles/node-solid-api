import { FastifyInstance } from "fastify";

import { authenticate } from "@/routes/controller/authenticate";
import { profile } from "@/routes/controller/profile";
import { register } from "@/routes/controller/register";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  app.get("/me", profile);
}
