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
          fullname: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 6 },
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
          email: { type: "string", format: "email" },
          password: { type: "string" },
        },
      },
    },
    handler: userController.login,
  });

  fastify.get("/me", {
    schema: {
      tags: ["user"],
      description: "Get current user information",
      security: [{ cookieAuth: [] }],
    },
    onRequest: [authenticate],
    handler: userController.getme,
  });

  fastify.delete("/delete", {
    schema: {
      tags: ["user"],
      description: "Delete current user",
      security: [{ cookieAuth: [] }],
    },
    onRequest: [authenticate],
    handler: userController.deleteUser,
  });

  fastify.put("/update", {
    schema: {
      tags: ["user"],
      description: "Update current user",
      security: [{ cookieAuth: [] }],
      body: {
        type: "object",
        properties: {
          fullname: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 6 },
        },
      },
    },
    onRequest: [authenticate],
    handler: userController.updateUser,
  });
};

export default userRoutes;
