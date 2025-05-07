import workspaceController from "@/controllers/workspaceController.js";
import { authenticate } from "@/middlewares/authMiddleware.js";

const workspaceRoutes = (fastify) => {
  fastify.post(
    "/create",
    { onRequest: authenticate },
    workspaceController.createWorkspace
  );
  fastify.get(
    "/all",
    { onRequest: authenticate },
    workspaceController.getAllWorkspaces
  );
  fastify.get(
    "/author",
    { onRequest: authenticate },
    workspaceController.getWorkspaceByAuthorId
  );
  fastify.delete(
    "/delete",
    { onRequest: authenticate },
    workspaceController.deleteWorkspace
  );
  fastify.put(
    "/update",
    { onRequest: authenticate },
    workspaceController.updateWorkspace
  );
};

export default workspaceRoutes;
