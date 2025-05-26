import documentController from "../controllers/documentController.js";
import authenticate from "../middlewares/authMiddleware.js";

const documentRoutes = (fastify) => {
  fastify.post("/create", {
    schema: {
      tags: ["document"],
      description: "Créer un nouveau document",
      security: [{ cookieAuth: [] }],
      body: {
        type: "object",
        required: ["name", "workspaceId"],
        properties: {
          name: { type: "string", description: "Nom du document" },
          content: { type: "string", description: "Contenu du document" },
          workspaceId: {
            type: "integer",
            description: "ID de l'espace de travail",
          },
        },
      },
      response: {
        201: {
          description: "Document créé",
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
          description: "Non authentifié",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Unauthorized - Token manquant ou invalide",
            },
          },
        },
        400: {
          description: "Données invalides",
          type: "object",
          properties: {
            message: {
              type: "string",
              examples: [
                "Le nom du document est requis",
                "L'ID de l'espace de travail est requis",
                "L'espace de travail n'existe pas",
              ],
            },
          },
        },
        403: {
          description: "Non autorisé",
          type: "object",
          properties: {
            message: {
              type: "string",
              example:
                "Vous n'êtes pas autorisé à créer un document dans cet espace de travail",
            },
          },
        },
        500: {
          description: "Erreur serveur",
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
      description: "Récupérer tous les documents",
      security: [{ cookieAuth: [] }],
      response: {
        200: {
          description: "Liste des documents",
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
          description: "Non authentifié",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Unauthorized - Token manquant ou invalide",
            },
          },
        },
        500: {
          description: "Erreur serveur",
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
      description: "Récupérer les documents de l'utilisateur connecté",
      security: [{ cookieAuth: [] }],
      response: {
        200: {
          description: "Documents de l'utilisateur",
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
          description: "Non authentifié",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Unauthorized - Token manquant ou invalide",
            },
          },
        },
        500: {
          description: "Erreur serveur",
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
      description: "Supprimer un document",
      security: [{ cookieAuth: [] }],
      body: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "integer", description: "ID du document à supprimer" },
        },
      },
      response: {
        200: {
          description: "Document supprimé",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Document supprimé avec succès",
            },
          },
        },
        401: {
          description: "Non authentifié",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Unauthorized - Token manquant ou invalide",
            },
          },
        },
        403: {
          description: "Non autorisé",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Vous n'êtes pas autorisé à supprimer ce document",
            },
          },
        },
        404: {
          description: "Non trouvé",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Document non trouvé",
            },
          },
        },
        500: {
          description: "Erreur serveur",
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
      description: "Mettre à jour un document",
      security: [{ cookieAuth: [] }],
      body: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "integer", description: "ID du document" },
          name: { type: "string", description: "Nouveau nom" },
          content: { type: "string", description: "Nouveau contenu" },
        },
      },
      response: {
        200: {
          description: "Document mis à jour",
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
          description: "Non authentifié",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Unauthorized - Token manquant ou invalide",
            },
          },
        },
        403: {
          description: "Non autorisé",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Vous n'êtes pas autorisé à modifier ce document",
            },
          },
        },
        404: {
          description: "Non trouvé",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Document non trouvé",
            },
          },
        },
        500: {
          description: "Erreur serveur",
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
      description: "Récupérer les documents d'un espace de travail",
      security: [{ cookieAuth: [] }],
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "integer", description: "ID de l'espace de travail" },
        },
      },
      response: {
        200: {
          description: "Documents de l'espace de travail",
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
          description: "Non authentifié",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Unauthorized - Token manquant ou invalide",
            },
          },
        },
        403: {
          description: "Non autorisé",
          type: "object",
          properties: {
            message: {
              type: "string",
              example:
                "Vous n'êtes pas autorisé à accéder à cet espace de travail",
            },
          },
        },
        404: {
          description: "Espace de travail non trouvé",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Espace de travail non trouvé",
            },
          },
        },
        500: {
          description: "Erreur serveur",
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
      description: "Récupérer un document par son ID",
      security: [{ cookieAuth: [] }],
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "integer", description: "ID du document" },
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
          description: "Non authentifié",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Unauthorized - Token manquant ou invalide",
            },
          },
        },
        403: {
          description: "Non autorisé",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Vous n'êtes pas autorisé à accéder à ce document",
            },
          },
        },
        404: {
          description: "Document non trouvé",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Document non trouvé",
            },
          },
        },
        500: {
          description: "Erreur serveur",
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
