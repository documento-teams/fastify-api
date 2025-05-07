import userController from "../controllers/userController.js";

const userRoutes = (fastify) => {
  fastify.post("/register", userController.register);
  fastify.post("/login", userController.login);
};

export default userRoutes;
