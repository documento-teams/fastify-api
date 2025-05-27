import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const workspaceController = {
  createWorkspace: async (request, reply) => {
    try {
      const data = request.body;
      if (!data) {
        return reply.status(400).send({ message: "No data send" });
      }
      if (!data.name) {
        return reply.status(400).send({ message: "All fields are required" });
      }
      const workspace = await prisma.workspace.create({
        data: {
          name: data.name,
          workspaceAuthorId: request.user.userId,
        },
      });
      return reply.status(201).send(workspace);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: "Internal server error" });
    }
  },
  getAllWorkspaces: async (request, reply) => {
    try {
      const workspaces = await prisma.workspace.findMany({
        include: {
          workspaceAuthor: true,
        },
      });
      return reply.status(200).send(workspaces);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: "Internal server error" });
    }
  },
  getWorkspaceByAuthorId: async (request, reply) => {
    try {
      const authorId = request.user.userId; // Récupérer depuis le token d'auth
      const workspaces = await prisma.workspace.findMany({
        where: {
          workspaceAuthorId: authorId,
        },
        include: {
          workspaceAuthor: {
            select: {
              fullname: true,
            },
          },
        },
      });
      return reply.status(200).send(workspaces);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: "Internal server error" });
    }
  },

  deleteWorkspace: async (request, reply) => {
    try {
      const { id } = request.params;
      const userId = request.user.userId;

      const workspace = await prisma.workspace.findUnique({
        where: { id: Number(id) },
      });

      if (!workspace) {
        return reply.status(404).send({ message: "Workspace not found" });
      }

      if (workspace.workspaceAuthorId !== userId) {
        return reply.status(403).send({ message: "Not authorized to delete this workspace" });
      }

      await prisma.workspace.delete({
        where: {
          id: Number(id),
        },
      });
      return reply
        .status(200)
        .send({ message: "Workspace deleted successfully" });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: "Internal server error" });
    }
  },

  updateWorkspace: async (request, reply) => {
    try {
      const { id, name } = request.body;
      const userId = request.user.userId;


      const workspace = await prisma.workspace.findUnique({
        where: { id: Number(id) },
      });

      if (!workspace) {
        return reply.status(404).send({ message: "Workspace not found" });
      }

      if (workspace.workspaceAuthorId !== userId) {
        return reply.status(403).send({ message: "Not authorized to update this workspace" });
      }

      const updatedWorkspace = await prisma.workspace.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
        },
      });
      return reply.status(200).send(updatedWorkspace);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: "Internal server error" });
    }
  },

  getWorkspaceById: async (request, reply) => {
    try {
      const id = request.params.id;
      const userId = request.user.userId;

      const workspace = await prisma.workspace.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          workspaceAuthor: true,
        },
      });

      if (!workspace) {
        return reply.status(404).send({ message: "Workspace not found" });
      }

      if (workspace.workspaceAuthorId !== userId) {
        return reply.status(403).send({ message: "Not authorized to access this workspace" });
      }
      return reply.status(200).send(workspace);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: "Internal server error" });
    }
  },
};

export default workspaceController;