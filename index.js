/* eslint-disable no-undef */
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import dotenv from "dotenv";
import prismaPlugin from "./plugins/prisma.js";
import routes from "./routes/index.js";

const fastify = Fastify({ logger: true });

dotenv.config();

fastify.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET || process.env.JWT_SECRET,
});

fastify.register(routes, { prefix: "/api" });

fastify.register(cors, {
  origin: (origin, cb) => {
    const allowedOrigins = [process.env.FRONTEND_URL];
    if (allowedOrigins.includes(origin) || !origin) {
      cb(null, true);
      return;
    }
    cb(new Error("Not allowed"), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

fastify.register(prismaPlugin);

const start = async () => {
  try {
    await fastify.listen({
      port: 3000,
      host: process.env.API_URL || "0.0.0.0",
    });
    console.log("server listening on port 3000");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

await start();
