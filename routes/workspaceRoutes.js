import workspaceController from "../controllers/workspaceController.js";
import authenticate from "../middlewares/authMiddleware.js";

const workspaceRoutes = (fastify) => {
  fastify.post("/create", {
    schema: {
      tags: ["workspace"],
      description: "Create a new workspace",
      security: [{ cookieAuth: [] }],
      body: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string" },
          description: { type: "string" },
        },
      },
    },
    onRequest: authenticate,
    handler: workspaceController.createWorkspace,
  });

  fastify.get("/all", {
    schema: {
      tags: ["workspace"],
      description: "Get all workspaces",
      security: [{ cookieAuth: [] }],
    },
    onRequest: authenticate,
    handler: workspaceController.getAllWorkspaces,
  });

  fastify.get("/author", {
    schema: {
      tags: ["workspace"],
      description: "Get workspaces for the current user",
      security: [{ cookieAuth: [] }],
    },
    onRequest: authenticate,
    handler: workspaceController.getWorkspaceByAuthorId,
  });

  fastify.delete("/delete", {
    schema: {
      tags: ["workspace"],
      description: "Delete a workspace",
      security: [{ cookieAuth: [] }],
      body: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "integer" },
        },
      },
    },
    onRequest: authenticate,
    handler: workspaceController.deleteWorkspace,
  });

  fastify.put("/update", {
    schema: {
      tags: ["workspace"],
      description: "Update a workspace",
      security: [{ cookieAuth: [] }],
      body: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          description: { type: "string" },
        },
      },
    },
    onRequest: authenticate,
    handler: workspaceController.updateWorkspace,
  });

  fastify.get("/:id", {
    schema: {
      tags: ["workspace"],
      description: "Get a workspace by ID",
      security: [{ cookieAuth: [] }],
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
      },
    },
    onRequest: authenticate,
    handler: workspaceController.getWorkspaceById,
  });
};

export default workspaceRoutes;
