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
          name: { type: "string" },
          content: { type: "string" },
          workspaceId: { type: "integer" },
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
    },
    onRequest: authenticate,
    handler: documentController.getAllDocuments,
  });

  fastify.get("/author", {
    schema: {
      tags: ["document"],
      description: "Get documents for the current user",
      security: [{ cookieAuth: [] }],
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
          id: { type: "integer" },
        },
      },
    },
    onRequest: authenticate,
    handler: documentController.deleteDocument,
  });

  fastify.put("/update/:id", {
    schema: {
      tags: ["document"],
      description: "Update a document",
      security: [{ cookieAuth: [] }],
      params: {
        type: "object",
        properties: {
          id: { type: "number", pattern: "^[0-9]+$" },
        },
      },
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          content: { type: "string" },
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
        properties: {
          id: { type: "string" },
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
        properties: {
          id: { type: "string" },
        },
      },
    },
    onRequest: authenticate,
    handler: documentController.getDocumentById,
  });
};

export default documentRoutes;
