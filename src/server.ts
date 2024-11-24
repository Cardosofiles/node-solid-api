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
