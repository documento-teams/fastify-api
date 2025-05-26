import workspaceController from "../controllers/workspaceController.js";
import authenticate from "../middlewares/authMiddleware.js";

const workspaceRoutes = (fastify) => {
  fastify.post("/create", {
    schema: {
      tags: ["workspace"],
      description: "Créer un nouvel espace de travail",
      security: [{ cookieAuth: [] }],
      body: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string", description: "Nom de l'espace de travail" },
          description: {
            type: "string",
            description: "Description de l'espace de travail",
          },
        },
      },
      response: {
        201: {
          description: "Espace de travail créé",
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
              example: "Le nom de l'espace de travail est requis",
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
    handler: workspaceController.createWorkspace,
  });

  fastify.get("/all", {
    schema: {
      tags: ["workspace"],
      description: "Récupérer tous les espaces de travail",
      security: [{ cookieAuth: [] }],
      response: {
        200: {
          description: "Liste des espaces de travail",
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
    handler: workspaceController.getAllWorkspaces,
  });

  fastify.get("/author", {
    schema: {
      tags: ["workspace"],
      description: "Récupérer les espaces de travail de l'utilisateur connecté",
      security: [{ cookieAuth: [] }],
      response: {
        200: {
          description: "Espaces de travail de l'utilisateur",
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
    handler: workspaceController.getWorkspaceByAuthorId,
  });

  fastify.delete("/delete", {
    schema: {
      tags: ["workspace"],
      description: "Supprimer un espace de travail",
      security: [{ cookieAuth: [] }],
      body: {
        type: "object",
        required: ["id"],
        properties: {
          id: {
            type: "integer",
            description: "ID de l'espace de travail à supprimer",
          },
        },
      },
      response: {
        200: {
          description: "Espace de travail supprimé",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Espace de travail supprimé avec succès",
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
                "Vous n'êtes pas autorisé à supprimer cet espace de travail",
            },
          },
        },
        404: {
          description: "Non trouvé",
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
    handler: workspaceController.deleteWorkspace,
  });

  fastify.put("/update", {
    schema: {
      tags: ["workspace"],
      description: "Mettre à jour un espace de travail",
      security: [{ cookieAuth: [] }],
      body: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "integer", description: "ID de l'espace de travail" },
          name: { type: "string", description: "Nouveau nom" },
          description: { type: "string", description: "Nouvelle description" },
        },
      },
      response: {
        200: {
          description: "Espace de travail mis à jour",
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
                "Vous n'êtes pas autorisé à modifier cet espace de travail",
            },
          },
        },
        404: {
          description: "Non trouvé",
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
    handler: workspaceController.updateWorkspace,
  });

  fastify.get("/:id", {
    schema: {
      tags: ["workspace"],
      description: "Récupérer un espace de travail par son ID",
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
          description: "Espace de travail",
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
          description: "Non authentifié",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Unauthorized - Token manquant ou invalide",
            },
          },
        },
        404: {
          description: "Non trouvé",
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
    handler: workspaceController.getWorkspaceById,
  });
};

export default workspaceRoutes;
