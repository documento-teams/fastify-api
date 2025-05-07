import userController from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const userRoutes = (fastify) => {
  fastify.post("/register", userController.register);
  fastify.post("/login", userController.login);
  fastify.get("/me", { onRequest: [authenticate] }, userController.getme);
  fastify.delete("/delete", { onRequest: [authenticate] }, userController.deleteUser);
  fastify.put("/update",{ onRequest: [authenticate] },userController.updateUser);
};

export default userRoutes;
