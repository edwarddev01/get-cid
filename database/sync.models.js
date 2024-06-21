//Importamos modelos
import { Admin } from "../models/admin.model.js";
import { Record } from "../models/record.model.js";
import { Token } from "../models/token.model.js";

//Sincronizando Modelos
export async function syncModels() {
    console.log("Sincronizando modelos...");
    Token.hasOne(Record,{
      foreignKey: "id_token"
    });
    Record.belongsTo(Token, {
      foreignKey: "id_token"
    });
    await Admin.sync();
    await Token.sync();
    await Record.sync();
    console.log("Modelos sincronizados.");
  }