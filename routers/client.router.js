// Importamos paquetes y archivos
const { Router } = require("express");
const { clientController } = require("../controllers/client.controller.js");
const { verifyRecaptchaToken } = require("../utils/recaptcha.util.js");
const { tokenValido } = require("../utils/token.util.js");

// Creamos el enrutador
const clientRouter = Router();

// Definimos las rutas
clientRouter.post("/api/v1/get-cid", [verifyRecaptchaToken, tokenValido], clientController.getCID);

// Exportamos el enrutador
module.exports = { clientRouter };
