import userRoutes from "./userRoutes.js";

const routes = async (fastify) => {
  fastify.register(userRoutes, { prefix: "/user" });
};

export default routes;
