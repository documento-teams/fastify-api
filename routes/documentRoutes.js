import documentController from "../controllers/documentController";
import { authenticate } from "../middlewares/authMiddleware.js";

const documentRoutes = (fastify) => {
  fastify.post("/create", documentController.createDocument);
  fastify.get("/all", documentController.getAllDocuments);
  fastify.get("/author", documentController.getDomcumentByAuthorId);
  fastify.delete("/delete", documentController.deleteDocument);
  fastify.put("/update", documentController.updateDocument);
};

export default documentRoutes;
