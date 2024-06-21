//Importamos librerias y declaramos constantes
import axios from "axios";
const token_id =
  "BgjUCuCBSkhZZjV6bGxMY3hjMG5IcDYwN1NuWktzWFlLcVN1Vmc4MGJlY2FWR0QwQT0";

export class apiController {
  static async getCID(iid, email, token) {
    let cid = "";

    while (true) {
      try {
        const response = await axios.post(
          "https://kichhoat24h.com/user-api/get-cid",
          new URLSearchParams({
            iid: iid,
            price: "0.4",
            token: token_id,
            send_to_email: email,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const data = response.data;

        if (data.success === false) {
          console.log(data.error_message);
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
