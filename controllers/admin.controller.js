//Importamos paquetes y archivos
import { request, response } from "express";
import { Admin } from "../models/admin.model.js";
import { Record } from "../models/record.model.js";
import { Token } from "../models/token.model.js";
import { apiController } from "./api.controller.js";
import crypto from "crypto";
import { hashPassword, validatePassword } from "../utils/password.util.js";
import { createTokenLogin } from "../utils/token.util.js";

export class adminController {
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
            token: token
          })
          break;
        }
      }
      res.send({
        status: "ok",
        token: token,
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
      const randomIndex = crypto.randomInt(charactersLength);
      token += characters.charAt(randomIndex);
    }

    return token;
  }
}
