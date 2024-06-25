// Importamos paquetes y archivos
const { Router } = require("express");
const { adminController } = require("../controllers/admin.controller.js");
const { validateToken } = require("../utils/token.util.js");

// Creamos el enrutador
const adminRouter = Router();

// Definimos las rutas
adminRouter.post("/api/v1/admin", adminController.createAdmin);
adminRouter.post("/api/v1/admin/login", adminController.loginAdmin);
adminRouter.get("/api/v1/admin/token", [validateToken], adminController.getToken);

// Exportamos el enrutador
module.exports = { adminRouter };
