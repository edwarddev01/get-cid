// Importamos archivos
const { request, response } = require("express");
const { Record } = require("../models/record.model.js");
const { Token } = require("../models/token.model.js");
const { apiController } = require("./api.controller.js");

class ClientController {
  static async getCID(req = request, res = response) {
    try {
      // Si se provee un access_token válido en los query params, se genera y formatea el CID
      if (req.query.access_token && req.query.access_token === process.env.ACCESS_TOKEN) {
        const cid = await apiController.getCID(req.body.iid);
        if (!cid) {
          return res.send({ status: "error", message: "No se pudo generar el CID." });
        }
        return res.send({ cid: cid.match(/.{1,6}/g).join('-') });
      }
      
      // Si ya existe un registro para el iid, se devuelve directamente
      const record = await ClientController.getRecord(req);
      if (record) {
        return res.send({
          status: "ok",
          cid: record.cid,
          aux_cid: ClientController.auxCID(record.cid),
        });
      }
      
      // Se busca el token en base a req.body.token
      const token = await Token.findOne({ where: { token: req.body.token } });
      if (!token) {
        return res.send({
          status: "error",
          message: "Token no existe, verifique nuevamente.",
        });
      }
      if (!token.status) {
        return res.send({
          status: "error",
          message: "Token expirado.",
        });
      }
      
      // Se genera el CID usando el apiController
      const cid = await apiController.getCID(req.body.iid);
      if (!cid) {
        return res.send({ status: "error", message: "No se pudo generar el CID." });
      }
      
      // Validamos que el CID contenga solo dígitos
      if (!/^[0-9]+$/.test(cid)) {
        return res.send({ status: "error", message: cid });
      }
      
      // Se decrementa la validez del token y se actualiza su estado si corresponde
      const updatedToken = await token.decrement("valid");
      if (updatedToken.valid <= 0) {
        await token.update({ status: false });
      }
      
      // Se crea un registro nuevo con el CID generado
      await ClientController.createRecord(req, token.id, cid);
      return res.send({
        status: "ok",
        cid: cid,
        aux_cid: ClientController.auxCID(cid),
      });
      
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        status: "Error",
        message: error.message,
      });
    }
  }

  static async getRecord(req) {
    try {
      return await Record.findOne({ where: { iid: req.body.iid } });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async createRecord(req, id_token, cid) {
    try {
      await Record.create({
        iid: req.body.iid,
        id_token: id_token || req.body.chat_id,
        cid: cid,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static auxCID(cid) {
    // Formatea el CID en grupos de 6 caracteres separados por guiones
    return cid.match(/.{1,6}/g).join('-');
  }
}

module.exports = { ClientController };
