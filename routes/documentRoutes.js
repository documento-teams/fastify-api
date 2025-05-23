import documentController from "../controllers/documentController";
import authenticate from "../middlewares/authMiddleware.js";

const documentRoutes = (fastify) => {
  fastify.post(
    "/create",
    { onRequest: authenticate },
    documentController.createDocument
  );
  fastify.get(
    "/all",
    { onRequest: authenticate },
    documentController.getAllDocuments
  );
  fastify.get(
    "/author",
    { onRequest: authenticate },
    documentController.getDocumentByAuthorId
  );
  fastify.delete(
    "/delete",
    { onRequest: authenticate },
    documentController.deleteDocument
  );
  fastify.put(
    "/update",
    { onRequest: authenticate },
    documentController.updateDocument
  );
  fastify.get(
    "/workspace/:id",
    { onRequest: authenticate },
    documentController.getDocumentsByWorkspaceId
  );
};

export default documentRoutes;
