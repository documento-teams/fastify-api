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
          name: { type: "string", description: "Workspace name" },
          description: {
            type: "string",
            description: "Workspace description",
          },
        },
      },
      response: {
        201: {
          description: "Workspace created",
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            description: { type: "string" },
            authorId: { type: "integer" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        401: {
          description: "Not authenticated",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Unauthorized - Missing or invalid token",
            },
          },
        },
        400: {
          description: "Invalid data",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Workspace name is required",
            },
          },
        },
        500: {
          description: "Server error",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Internal server error",
            },
          },
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
      response: {
        200: {
          description: "List of workspaces",
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              name: { type: "string" },
              description: { type: "string" },
              authorId: { type: "integer" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
        },
        401: {
          description: "Not authenticated",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Unauthorized - Missing or invalid token",
            },
          },
        },
        500: {
          description: "Server error",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Internal server error",
            },
          },
        },
      },
    },
    onRequest: authenticate,
    handler: workspaceController.getAllWorkspaces,
  });

  fastify.get("/author", {
    schema: {
      tags: ["workspace"],
      description: "Get workspaces for the current user",
      security: [{ cookieAuth: [] }],
      response: {
        200: {
          description: "User's workspaces",
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              name: { type: "string" },
              description: { type: "string" },
              authorId: { type: "integer" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
        },
        401: {
          description: "Not authenticated",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Unauthorized - Missing or invalid token",
            },
          },
        },
        500: {
          description: "Server error",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Internal server error",
            },
          },
        },
      },
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
          id: {
            type: "integer",
            description: "ID of the workspace to delete",
          },
        },
      },
      response: {
        200: {
          description: "Workspace deleted",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Workspace successfully deleted",
            },
          },
        },
        401: {
          description: "Not authenticated",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Unauthorized - Missing or invalid token",
            },
          },
        },
        403: {
          description: "Not authorized",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "You are not authorized to delete this workspace",
            },
          },
        },
        404: {
          description: "Not found",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Workspace not found",
            },
          },
        },
        500: {
          description: "Server error",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Internal server error",
            },
          },
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
          id: { type: "integer", description: "Workspace ID" },
          name: { type: "string", description: "New name" },
          description: { type: "string", description: "New description" },
        },
      },
      response: {
        200: {
          description: "Workspace updated",
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            description: { type: "string" },
            authorId: { type: "integer" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        401: {
          description: "Not authenticated",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Unauthorized - Missing or invalid token",
            },
          },
        },
        403: {
          description: "Not authorized",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "You are not authorized to modify this workspace",
            },
          },
        },
        404: {
          description: "Not found",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Workspace not found",
            },
          },
        },
        500: {
          description: "Server error",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Internal server error",
            },
          },
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
        required: ["id"],
        properties: {
          id: { type: "integer", description: "Workspace ID" },
        },
      },
      response: {
        200: {
          description: "Workspace",
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            description: { type: "string" },
            authorId: { type: "integer" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        401: {
          description: "Not authenticated",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Unauthorized - Missing or invalid token",
            },
          },
        },
        404: {
          description: "Not found",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Workspace not found",
            },
          },
        },
        500: {
          description: "Server error",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Internal server error",
            },
          },
        },
      },
    },
    onRequest: authenticate,
    handler: workspaceController.getWorkspaceById,
  });
};

export default workspaceRoutes;
