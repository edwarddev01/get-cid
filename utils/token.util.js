const Jwt = require("jsonwebtoken");
const { request, response } = require("express");
const { Token } = require("../models/token.model.js");

function createTokenLogin(data) {
  try {
    return Jwt.sign(data, process.env.SECRET || "secret_key", {
      expiresIn: "7d",
    });
  } catch (error) {
    console.error("Error al crear el token:", error);
  }
}

function validateToken(req = request, res = response, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).send({
        status: "Unauthorized",
        message: "Se requiere autenticación. Falta el token en el encabezado.",
      });
    }
    const token = authorization.replace("Bearer ", "");
    const decodedToken = Jwt.verify(token, process.env.SECRET || "secret_key");
    if (decodedToken) {
      const userData = {
        id: decodedToken.id,
        name: decodedToken.name,
        email: decodedToken.email,
        token_id: decodedToken.token_id,
        s2f: decodedToken.secret ? true : false,
      };
      req.user = userData;
      next();
    } else {
      res.status(401).send({
        status: "Unauthorized",
        message: "Autenticación requerida",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Unauthorized",
      message: "Error al validar la autenticación " + error.message,
    });
  }
}

async function tokenValido(req = request, res = response, next) {
  try {
    const token = await Token.findOne({
      where: {
        token: req.body.token,
        status: true,
      },
    });
    if (token) {
      next();
    } else {
      res.status(401).send({
        status: "error",
        message: "Token invalido, revise e intente nuevamente!!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Erro de servidor",
    });
  }
}

module.exports = {
  createTokenLogin,
  validateToken,
  tokenValido,
};
