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
    { onResquest: authenticate },
    documentController.getDomcumentByAuthorId
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
};

export default documentRoutes;
