import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const documentController = {
  createDocument: async (request, reply) => {
    try {
      const { name , content , workspaceId , userId } = request.body;
      const document = await prisma.document.create({
        data: {
          name,
          content,
          workspaceId,
          documentAuthorId: userId,
        },
      });
      return reply.status(201).send(document);
    }catch (error) {
      console.error("Error creating document:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  },
  getAllDocuments: async (request , reply) => {
    try {
      const documents = await prisma.document.findMany({
        include:{
          documentAuthor:{
            select: {
              fullname: true
            }
          }
        }
      });
      return reply.status(200).send(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  },
  getDomcumentByAuthorId: async (request , reply) => {
    try {
      const { userId } = request.body;
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
  deleteDocument: async (request , reply) => {
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
  updateDocument: async (request , reply) => {
    try {
      const { documentId , name , content } = request.body;
      const updatedDocument = await prisma.document.update({
        where: {
          id: documentId,
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
};

export default documentController;