/* eslint-disable no-undef */
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const documentController = {
  createDocument: async (request, reply) => {
    try {
      const { name, content, workspaceId } = request.body;
      const token = request.cookies.token;
      if (!token) {
        return reply.status(401).send({ error: "Authentication required" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const document = await prisma.document.create({
        data: {
          name,
          content,
          workspaceId,
          documentAuthorId: Number(decoded.id),
        },
      });
      return reply.status(201).send(document);
    } catch (error) {
      console.error("Error creating document:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  },
  getAllDocuments: async (request, reply) => {
    try {
      const documents = await prisma.document.findMany({
        include: {
          documentAuthor: {
            select: {
              fullname: true,
            },
          },
        },
      });
      return reply.status(200).send(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  },
  getDocumentByAuthorId: async (request, reply) => {
    try {
      const { userId } = request.user.userId;
      const documents = await prisma.document.findMany({
        where: {
          documentAuthorId: userId,
        },
      });
      return reply.status(200).send(documents);
    } catch (error) {
      console.error("Error fetching documents by author ID:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  },
  deleteDocument: async (request, reply) => {
    try {
      const { documentId } = request.body;
      await prisma.document.delete({
        where: {
          id: documentId,
        },
      });
      return reply.status(200).send("document deleted successfully");
    } catch (error) {
      console.error("Error deleting document:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  },
  updateDocument: async (request, reply) => {
    try {
      const { name, content } = request.body;
      const { id } = request.params;
      const updatedDocument = await prisma.document.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
          content,
        },
      });
      return reply.status(200).send(updatedDocument);
    } catch (error) {
      console.error("Error updating document:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  },
  getDocumentsByWorkspaceId: async (request, reply) => {
    try {
      const { id } = request.params;
      const workspaceId = parseInt(id, 10);
      if (isNaN(workspaceId)) {
        return reply.status(400).send({ error: "Invalid workspace ID" });
      }
      const workspace = await prisma.workspace.findUnique({
        where: {
          id: workspaceId,
        },
      });
      if (!workspace) {
        return reply.status(404).send({ error: "Workspace not found" });
      }
      const documents = await prisma.document.findMany({
        where: {
          workspaceId: workspaceId,
        },
        include: {
          documentAuthor: {
            select: {
              fullname: true,
            },
          },
        },
      });
      return reply.status(200).send(documents);
    } catch (error) {
      console.error("Error fetching documents by workspace ID:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  },
  getDocumentById: async (request, reply) => {
    try {
      const { id } = request.params;
      const document = await prisma.document.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!document) {
        return reply.status(404).send({ error: "Document not found" });
      }
      return reply.status(200).send(document);
    } catch {
      console.error("Error fetching document by ID:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  },
};

export default documentController;
