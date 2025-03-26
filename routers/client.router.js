// Importamos paquetes y archivos
const { Router } = require("express");
const { ClientController } = require("../controllers/client.controller.js");
const { verifyRecaptchaToken } = require("../utils/recaptcha.util.js");
//const { tokenValido } = require("../utils/token.util.js");

// Creamos el enrutador
const clientRouter = Router();

// Definimos las rutas
clientRouter.post("/api/v1/get-cid", [verifyRecaptchaToken], ClientController.getCID);
clientRouter.post("/validate-token")
// Exportamos el enrutador
module.exports = { clientRouter };
