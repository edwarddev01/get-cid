// Importamos paquetes y archivos
const { Router } = require("express");
const { adminController } = require("../controllers/admin.controller.js");
const { validateToken } = require("../utils/token.util.js");
const { verifyRecaptchaToken } = require("../utils/recaptcha.util.js");

// Creamos el enrutador
const adminRouter = Router();

// Definimos las rutas
adminRouter.post("/api/v1/admin",[validateToken], adminController.createAdmin);
adminRouter.post("/api/v1/admin/login",[verifyRecaptchaToken], adminController.loginAdmin);
adminRouter.post("/api/v1/admin/token", [validateToken], adminController.getToken);
adminRouter.get("/api/v1/admin/tokens",[validateToken], adminController.getTokens)
adminRouter.get("/api/v1/admin/records",[validateToken], adminController.getRecords)


// Exportamos el enrutador
module.exports = { adminRouter };
