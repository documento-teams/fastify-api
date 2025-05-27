import userRoutes from "./userRoutes.js";
import workspaceroute from "./workspaceRoutes.js";
import documentRoute from "./documentRoutes.js";

const routes = async (fastify) => {
  fastify.register(userRoutes, { prefix: "/user" });
  fastify.register(workspaceroute, { prefix: "/workspace" });
  fastify.register(documentRoute, { prefix: "/document" });
};

export default routes;
