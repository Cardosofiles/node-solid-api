import { app } from "@/app";
import { env } from "@/env";

const server_port = env.PORT || 4000;

app
  .listen({
    host: "0.0.0.0", // Listen on all interfaces (0.0.0.0)
    port: server_port,
  })
  .then(() => {
    console.log(`🚀 Server is running on port localhost:${server_port}`);
  });

//  docker run --name node-solid-api-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=api-solid -p 5432:5432 bitnami/postgresql
// docker start node-solid-api-pg || ea7a1894a3fc: start a container docker pg
// docker stop node-solid-api-pg || ea7a1894a3fc: to stop a container docker pg
// docker rm node-solid-api-pg || ea7a1894a3: delete a container docker pg
