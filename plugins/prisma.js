import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

const prismaPlugin = fp(async (server) => {
  const prisma = new PrismaClient();

  await prisma.$connect();
  server.decorate("prisma", prisma);
  server.log.info("Prisma client connected");
  server.addHook("onClose", async (instance) => {
    await instance.prisma.$disconnect();
  });
});

export default prismaPlugin;
