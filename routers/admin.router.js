//Importamos paquetes y archivos
import { Router } from "express";
import { adminController } from "../controllers/admin.controller.js";
import { validateToken } from "../utils/token.util.js";
export const adminRouter = Router();

adminRouter.post("/api/v1/admin", adminController.createAdmin);
adminRouter.post("/api/v1/admin/login", adminController.loginAdmin);
adminRouter.get("/api/v1/admin/token",[validateToken],adminController.getToken)
