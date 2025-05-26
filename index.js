/* eslint-disable no-undef */
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import dotenv from "dotenv";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import prismaPlugin from "./plugins/prisma.js";
import routes from "./routes/index.js";

const fastify = Fastify({ logger: true });

dotenv.config();

// Registrer Swagger
fastify.register(swagger, {
  swagger: {
    info: {
      title: "Documento API",
      description: "API pour l'application Documento",
      version: "1.0.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host: `${process.env.API_URL || "localhost"}:3000`,
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      { name: "user", description: "User related endpoints" },
      { name: "workspace", description: "Workspace related endpoints" },
      { name: "document", description: "Document related endpoints" },
    ],
    securityDefinitions: {
      cookieAuth: {
        type: "apiKey",
        name: "token",
        in: "cookie",
      },
    },
  },
});

// Registrer Swagger UI
fastify.register(swaggerUI, {
  routePrefix: "/documentation",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
});

fastify.register(fastifyCookie);

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
