import { app } from "@/app";
import { env } from "@/env";

const serverPort = env.PORT || 4000;

app
  .listen({
    host: "0.0.0.0",
    port: serverPort,
  })
  .then(() => {
    console.log(`🚀 Server is running on port localhost:${serverPort}`);
  });
