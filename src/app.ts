import fastify from "fastify";

export const app = fastify();

app.addHook("preHandler", async (request, reply) => {
  console.log(`[${request.method}] ${request.url}`);
});
