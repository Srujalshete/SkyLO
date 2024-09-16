import "dotenv/config";
import Fastify from "fastify";
import { connectDB } from "./src/config/connect.js";

const start = async () => {
  try {
    // Connect to MongoDB
    await connectDB(process.env.MONGO_URI);
    
    // Initialize Fastify app
    const app = Fastify();
    const PORT = process.env.PORT || 3000;

    // Start the Fastify server
    app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
      if (err) {
        console.error("Error starting server:", err);
        process.exit(1); // Exit process if server fails to start
      } else {
        console.log(`Skylo Started on ${addr}`);
      }
    });
  } catch (error) {
    console.error("Error during startup:", error);
    process.exit(1); // Exit process on failure
  }
};

start();
