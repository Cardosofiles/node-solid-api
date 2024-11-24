import fastify from "fastify";

import { appRoutes } from "./http/routes";

export const app = fastify();

app.addHook("preHandler", async (request) => {
  console.log(`[${request.method}] ${request.url}`);
});

app.register(appRoutes);
