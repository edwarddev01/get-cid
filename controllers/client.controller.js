//Importamos archivos
const { request, response } = require("express");
const { Record } = require("../models/record.model.js");
const { Token } = require("../models/token.model.js");
const { apiController } = require("./api.controller.js");

class clientController {
  static async getCID(req = request, res = response) {
    try {
      const token = await Token.findOne({
        where: {
          token: req.body.token,
          status: true,
        },
      });
      if (token) {
        const cid = await apiController.getCID(req.body.iid);
        if (cid) {
          const regex = /^[0-9]*$/;
          if (regex.test(cid)) {
            const aux_cid = clientController.auxCID(cid);
            token.decrement("valid");
            if (token.valid == 1) {
              await token.update({ status: false });
            }
            await clientController.createRecord(req, res, token.id, cid);
            res.send({
              status: "ok",
              cid: cid,
              aux_cid: aux_cid,
            });
          } else {
            res.send({
              status: "error",
              message: cid,
            });
          }
        }
      } else {
        res.send({
          status: "error",
          message: "Token invalido!!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "Error",
        message: error.message,
      });
    }
  }

  static async createRecord(req = request, res = response, id_token, cid) {
    try {
      await Record.create({
        iid: req.body.iid,
        id_token: id_token,
        cid: cid,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "Error",
        message: error.message,
      });
    }
  }

  static auxCID(cid) {
    let aux_cid = "";
    let i = 1;

    for (let index = 0; index < cid.length; index++) {
      const element = cid[index];
      if (i < 6) {
        aux_cid += element;
        i++;
      } else {
        aux_cid += element + "-";
        i = 1;
      }
    }
    return aux_cid.substring(0, aux_cid.length - 1);
  }
}

module.exports = { clientController };
