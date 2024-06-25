//Importamos librerias y declaramos constantes
const axios = require("axios");
require('dotenv').config();
const token_id = process.env.TOKEN_ID || "BgjUCuCBSkhZZjV6bGxMY3hjMG5IcDYwN1NuWktzWFlLcVN1Vmc4MGJlY2FWR0QwQT0";

class apiController {
  static async getCID(iid) {
    let cid = "";

    while (true) {
      try {
        const response = await axios.post(
          "https://kichhoat24h.com/user-api/get-cid",
          new URLSearchParams({
            iid: iid,
            price: "0.4",
            token: token_id
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const data = response.data;

        if (data.success === false) {
          cid = data.error_message;
          break;
        } else if (data.cid) {
          cid = data.cid;
          break;
        } else if (!data.response_message.includes("We are calling")) {
          cid = data.response_message;
          break;
        }
      } catch (error) {
        console.error(error);
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return cid;
  }
}

module.exports = { apiController }