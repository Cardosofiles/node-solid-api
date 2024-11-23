import { app } from "./app";

app
  .listen({
    host: "0.0.0.0", // Listen on all interfaces (0.0.0.0)
    port: 3333,
  })
  .then(() => {
    console.log("🚀 Server is running on port 3333");
  });
