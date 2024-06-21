//Importamos paquetes y archivos
import { Router } from "express";
import { clientController } from "../controllers/client.controller.js";
export const clientRouter = Router();

clientRouter.post("/api/v1/get-cid", clientController.getCID);

