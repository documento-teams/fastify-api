import userRoutes from "./userRoutes.js";
import workspaceroute from "./workspaceRoutes.js";

const routes = async (fastify) => {
  fastify.register(userRoutes, { prefix: "/user" });
  fastify.register(workspaceroute, { prefix: "/workspace" });
};

export default routes;
