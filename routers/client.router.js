//Importamos paquetes y archivos
import { Router } from "express";
import { clientController } from "../controllers/client.controller.js";
import { verifyRecaptchaToken } from "../utils/recaptcha.util.js";
import { tokenValido } from "../utils/token.util.js";
export const clientRouter = Router();

clientRouter.post("/api/v1/get-cid",[verifyRecaptchaToken, tokenValido], clientController.getCID);

