const axios = require('axios');
require('dotenv/config');
const { request, response } = require("express");


async function verifyRecaptchaToken(req = request, res = response, next) {
    if (!req.body.recaptchaToken) {
        return res.status(400).json({ message: 'reCAPTCHA: falta el token.' });
    }
    const secretKey = process.env.RECAPTCHA_SECRET_KEY || "6LefMP8pAAAAAMouw-l7e6C5D1qXk-aeUM57Y38K";
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.recaptchaToken}`;
  
    try {
      const response = await axios.post(url);
      if (!response.data.success ) {
        console.log(response.data)
        return res.status(400).json({ message: 'reCAPTCHA: Fallo en la verificación.' });
      }
      next();
    } catch (error) {
      console.error('Error verificando reCAPTCHA:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { verifyRecaptchaToken };
