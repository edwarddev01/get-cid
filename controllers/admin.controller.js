//Importamos paquetes y archivos
const { request, response } = require("express");
const { Admin } = require("../models/admin.model.js");
const { Record } = require("../models/record.model.js");
const { Token } = require("../models/token.model.js");
const { apiController } = require("./api.controller.js");
//const crypto = require("crypto");
const { hashPassword, validatePassword } = require("../utils/password.util.js");
const { createTokenLogin } = require("../utils/token.util.js");

class adminController {
  static async createAdmin(req = request, res = response) {
    try {
      req.body.password = await hashPassword(req.body.password);
      const admin = await Admin.create(req.body);
      if (admin) {
        admin.password = undefined;
        res.send({
          status: "ok",
          message: "Usuario creado",
          user: admin,
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

  static async loginAdmin(req = request, res = response) {
    try {
      const admin = await Admin.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (admin) {
        const isValid = validatePassword(req.body.password, admin.password);
        if (isValid) {
          admin.password = undefined;
          const token = createTokenLogin(admin.toJSON());
          res.setHeader("Authorization", `Bearer ${token}`);
          res.send({
            status: "ok",
            message: "Bienvenido admin",
          });
        } else {
          res.status(401).send({
            status: "Unauthorized",
            message: "Contraseña incorrecta!",
          });
        }
      } else {
        res.status(401).send({
          status: "Unauthorized",
          message: "Usuario no encontrado",
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
  static async getTokens(req = request, res = response) {
    try {
      const tokens = await Token.findAll({
        order: [["status","DESC"],["createdAt", "DESC"]],
      });
      res.send(tokens);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "Error",
        message: error.message,
      });
    }
  }
  static async getRecords(req = request, res = response) {
    try {
      const records = await Record.findAll({
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Token,
          },
        ],
      });
      res.send(records);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "Error",
        message: error.message,
      });
    }
  }
  static async getToken(req = request, res = response) {
    try {
      const admin = await Admin.findOne({
        where: {
          id: req.user.id,
          email: req.user.email,
        },
      });
      if (!admin) {
        res
          .status(401)
          .send({
            status: "Unauthorized",
            message: "Usuario inexistente",
          })
          .end();
      }
      let token = "";
      while (true) {
        const token_aux = adminController.generateToken();
        const record = await Token.findOne({
          where: {
            token: token_aux,
          },
        });
        if (!record) {
          token = token_aux;
          await Token.create({
            token: token,
            valid: req.body.valid,
          });
          break;
        }
      }
      res.send({
        status: "ok",
        token: token,
        valid: req.body.valid,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "Error",
        message: error.message,
      });
    }
  }
  static generateToken() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let token = "";

    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      token += characters.charAt(randomIndex);
    }
    return token;
  }
}

module.exports = { adminController };
