/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const verifyUserWorkspaceProperty = async (userId, workspaceId) => {
  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    select: {},
  });
};

const isUserWorkspace = async (request, reply, done) => {
  try {
    const token = request.cookies.token;
    const { workspaceId } = request.body;
    if (!token) {
      return reply.code(401).send({ error: "Missing token " });
    }

    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    if (isValid) {
      token.decode(token);
      await verifyUserWorkspaceProperty(token.userId);
    }
  } catch (error) {
    return reply.code(401).send({ error: error.message });
  }
};

export default isUserWorkspace;
