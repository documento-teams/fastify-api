import userController from "../controllers/userController.js";
import authenticate from "../middlewares/authMiddleware.js";

const userRoutes = (fastify) => {
  fastify.post("/register", {
    schema: {
      tags: ["user"],
      description: "Register a new user",
      body: {
        type: "object",
        required: ["fullname", "email", "password"],
        properties: {
          fullname: {
            type: "string",
            description: "User's full name",
          },
          email: {
            type: "string",
            format: "email",
            description: "User's email",
          },
          password: {
            type: "string",
            minLength: 6,
            description: "Password (min 6 characters)",
          },
        },
      },
      response: {
        201: {
          description: "User successfully created",
          type: "object",
          properties: {
            user: {
              type: "object",
              properties: {
                id: { type: "integer" },
                fullname: { type: "string" },
                email: { type: "string" },
              },
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
                "All fields are required",
                "This email is already in use",
                "Invalid email format",
              ],
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
    handler: userController.register,
  });

  fastify.post("/login", {
    schema: {
      tags: ["user"],
      description: "Log in a user",
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            description: "User's email",
          },
          password: { type: "string", description: "Password" },
        },
      },
      response: {
        200: {
          description: "Login successful",
          type: "object",
          properties: {
            user: {
              type: "object",
              properties: {
                id: { type: "integer" },
                fullname: { type: "string" },
                email: { type: "string" },
              },
            },
          },
        },
        400: {
          description: "Invalid credentials",
          type: "object",
          properties: {
            message: {
              type: "string",
              examples: ["Email or password incorrect", "Email not found"],
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
    handler: userController.login,
  });

  fastify.get("/me", {
    schema: {
      tags: ["user"],
      description: "Get information of the currently logged in user",
      security: [{ cookieAuth: [] }],
      response: {
        200: {
          description: "User information",
          type: "object",
          properties: {
            id: { type: "integer" },
            fullname: { type: "string" },
            email: { type: "string" },
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
    onRequest: [authenticate],
    handler: userController.getme,
  });

  fastify.delete("/delete", {
    schema: {
      tags: ["user"],
      description: "Delete a user",
      security: [{ cookieAuth: [] }],
      response: {
        200: {
          description: "User deleted",
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "User successfully deleted",
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
    onRequest: [authenticate],
    handler: userController.deleteUser,
  });

  fastify.put("/update", {
    schema: {
      tags: ["user"],
      description: "Update a user",
      security: [{ cookieAuth: [] }],
      body: {
        type: "object",
        properties: {
          fullname: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 6 },
        },
      },
      response: {
        200: {
          description: "User updated",
          type: "object",
          properties: {
            id: { type: "integer" },
            fullname: { type: "string" },
            email: { type: "string" },
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
                "This email is already in use",
                "Invalid email format",
                "Password must be at least 6 characters",
              ],
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
    onRequest: [authenticate],
    handler: userController.updateUser,
  });
};

export default userRoutes;