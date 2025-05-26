import userController from "../controllers/userController.js";
import authenticate from "../middlewares/authMiddleware.js";

const userRoutes = (fastify) => {
  fastify.post("/register", {
    schema: {
      tags: ["user"],
      description: "Enregistrer un nouvel utilisateur",
      body: {
        type: "object",
        required: ["fullname", "email", "password"],
        properties: {
          fullname: { type: "string", description: "Nom complet de l'utilisateur" },
          email: { type: "string", format: "email", description: "Email de l'utilisateur" },
          password: { type: "string", minLength: 6, description: "Mot de passe (min 6 caractères)" }
        }
      },
      response: {
        201: {
          description: "Utilisateur créé avec succès",
          type: "object",
          properties: {
            user: {
              type: "object",
              properties: {
                id: { type: "integer" },
                fullname: { type: "string" },
                email: { type: "string" }
              }
            }
          }
        },
        400: {
          description: "Données invalides",
          type: "object",
          properties: {
            message: {
              type: "string",
              examples: ["Tous les champs sont requis", "Cet email est déjà utilisé", "Format d'email invalide"]
            }
          }
        },
        500: {
          description: "Erreur serveur",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Internal server error"
            }
          }
        }
      }
    },
    handler: userController.register
  });

  fastify.post("/login", {
    schema: {
      tags: ["user"],
      description: "Connecter un utilisateur",
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", description: "Email de l'utilisateur" },
          password: { type: "string", description: "Mot de passe" }
        }
      },
      response: {
        200: {
          description: "Connexion réussie",
          type: "object",
          properties: {
            user: {
              type: "object",
              properties: {
                id: { type: "integer" },
                fullname: { type: "string" },
                email: { type: "string" }
              }
            }
          }
        },
        400: {
          description: "Identifiants invalides",
          type: "object",
          properties: {
            message: {
              type: "string",
              examples: ["Email ou mot de passe incorrect", "Email non trouvé"]
            }
          }
        },
        500: {
          description: "Erreur serveur",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Internal server error"
            }
          }
        }
      }
    },
    handler: userController.login
  });

  fastify.get("/me", {
    schema: {
      tags: ["user"],
      description: "Récupérer les informations de l'utilisateur connecté",
      security: [{ cookieAuth: [] }],
      response: {
        200: {
          description: "Informations utilisateur",
          type: "object",
          properties: {
            id: { type: "integer" },
            fullname: { type: "string" },
            email: { type: "string" }
          }
        },
        401: {
          description: "Non authentifié",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Unauthorized - Token manquant ou invalide"
            }
          }
        },
        500: {
          description: "Erreur serveur",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Internal server error"
            }
          }
        }
      }
    },
    onRequest: [authenticate],
    handler: userController.getme
  });

  fastify.delete("/delete", {
    schema: {
      tags: ["user"],
      description: "Supprimer un utilisateur",
      security: [{ cookieAuth: [] }],
      response: {
        200: {
          description: "Utilisateur supprimé",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Utilisateur supprimé avec succès"
            }
          }
        },
        401: {
          description: "Non authentifié",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Unauthorized - Token manquant ou invalide"
            }
          }
        },
        500: {
          description: "Erreur serveur",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Internal server error"
            }
          }
        }
      }
    },
    onRequest: [authenticate],
    handler: userController.deleteUser
  });

  fastify.put("/update", {
    schema: {
      tags: ["user"],
      description: "Mettre à jour un utilisateur",
      security: [{ cookieAuth: [] }],
      body: {
        type: "object",
        properties: {
          fullname: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 6 }
        }
      },
      response: {
        200: {
          description: "Utilisateur mis à jour",
          type: "object",
          properties: {
            id: { type: "integer" },
            fullname: { type: "string" },
            email: { type: "string" }
          }
        },
        401: {
          description: "Non authentifié",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Unauthorized - Token manquant ou invalide"
            }
          }
        },
        400: {
          description: "Données invalides",
          type: "object",
          properties: {
            message: {
              type: "string",
              examples: ["Cet email est déjà utilisé", "Format d'email invalide", "Le mot de passe doit contenir au moins 6 caractères"]
            }
          }
        },
        500: {
          description: "Erreur serveur",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Internal server error"
            }
          }
        }
      }
    },
    onRequest: [authenticate],
    handler: userController.updateUser
  });
};

export default userRoutes;