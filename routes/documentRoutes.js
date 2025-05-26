import documentController from "../controllers/documentController.js";
import authenticate from "../middlewares/authMiddleware.js";

const documentRoutes = (fastify) => {
  fastify.post("/create", {
    schema: {
      tags: ["document"],
      description: "Create a new document",
      security: [{ cookieAuth: [] }],
      body: {
        type: "object",
        required: ["name", "workspaceId"],
        properties: {
          name: { type: "string", description: "Document name" },
          content: { type: "string", description: "Document content" },
          workspaceId: {
            type: "integer",
            description: "Workspace ID",
          },
        },
      },
      response: {
        201: {
          description: "Document created",
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            content: { type: "string" },
            authorId: { type: "integer" },
            workspaceId: { type: "integer" },
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
              examples: [
                "Document name is required",
                "Workspace ID is required",
                "Workspace does not exist",
              ],
            },
          },
        },
        403: {
          description: "Not authorized",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "You are not authorized to create a document in this workspace",
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
    handler: documentController.createDocument,
  });

  fastify.get("/all", {
    schema: {
      tags: ["document"],
      description: "Get all documents",
      security: [{ cookieAuth: [] }],
      response: {
        200: {
          description: "List of documents",
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              name: { type: "string" },
              content: { type: "string" },
              authorId: { type: "integer" },
              workspaceId: { type: "integer" },
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
    handler: documentController.getAllDocuments,
  });

  fastify.get("/author", {
    schema: {
      tags: ["document"],
      description: "Get documents for the current user",
      security: [{ cookieAuth: [] }],
      response: {
        200: {
          description: "User's documents",
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              name: { type: "string" },
              content: { type: "string" },
              authorId: { type: "integer" },
              workspaceId: { type: "integer" },
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
    handler: documentController.getDocumentByAuthorId,
  });

  fastify.delete("/delete", {
    schema: {
      tags: ["document"],
      description: "Delete a document",
      security: [{ cookieAuth: [] }],
      body: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "integer", description: "ID of the document to delete" },
        },
      },
      response: {
        200: {
          description: "Document deleted",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Document successfully deleted",
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
              example: "You are not authorized to delete this document",
            },
          },
        },
        404: {
          description: "Not found",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Document not found",
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
    handler: documentController.deleteDocument,
  });

  fastify.put("/update", {
    schema: {
      tags: ["document"],
      description: "Update a document",
      security: [{ cookieAuth: [] }],
      body: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "integer", description: "Document ID" },
          name: { type: "string", description: "New name" },
          content: { type: "string", description: "New content" },
        },
      },
      response: {
        200: {
          description: "Document updated",
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            content: { type: "string" },
            authorId: { type: "integer" },
            workspaceId: { type: "integer" },
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
              example: "You are not authorized to modify this document",
            },
          },
        },
        404: {
          description: "Not found",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Document not found",
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
    handler: documentController.updateDocument,
  });

  fastify.get("/workspace/:id", {
    schema: {
      tags: ["document"],
      description: "Get documents for a workspace",
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
          description: "Workspace documents",
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              name: { type: "string" },
              content: { type: "string" },
              authorId: { type: "integer" },
              workspaceId: { type: "integer" },
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
        403: {
          description: "Not authorized",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "You are not authorized to access this workspace",
            },
          },
        },
        404: {
          description: "Workspace not found",
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
    handler: documentController.getDocumentsByWorkspaceId,
  });

  fastify.get("/:id", {
    schema: {
      tags: ["document"],
      description: "Get a document by ID",
      security: [{ cookieAuth: [] }],
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "integer", description: "Document ID" },
        },
      },
      response: {
        200: {
          description: "Document",
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            content: { type: "string" },
            authorId: { type: "integer" },
            workspaceId: { type: "integer" },
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
              example: "You are not authorized to access this document",
            },
          },
        },
        404: {
          description: "Document not found",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Document not found",
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
    handler: documentController.getDocumentById,
  });
};

export default documentRoutes;