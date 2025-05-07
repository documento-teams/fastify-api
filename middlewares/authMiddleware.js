/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function authenticate(request, reply, done) {
  try {
    const token = request.cookies.token;
    if (!token) {
      return reply.code(401).send({ error: "Authentication required" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    if (!decoded || typeof decoded !== "object" || !decoded.userId) {
      return reply.code(401).send({ error: "Invalid token payload" });
    }
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    console.log("User found:", user);

    if (!user) {
      return reply.code(401).send({ error: "Invalid token" });
    }

    request.user = { userId: user.id };

    done();
  } catch (error) {
    return reply.code(401).send({ error: error.message });
  }
}
