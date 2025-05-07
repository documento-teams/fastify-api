/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function authenticate(request, reply, done) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader || authHeader.startsWith("Bearer") === false) {
      return reply.code(401).send({ error: "Authentication required" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return reply.code(401).send({ error: "Authentication required" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || typeof decoded !== "object" || !decoded.id) {
      return reply.code(401).send({ error: "Invalid token payload" });
    }
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return reply.code(401).send({ error: "Invalid token" });
    }

    request.user = { userId: user.id };

    done();
  } catch (error) {
    return reply.code(401).send({ error: error.message });
  }
}
