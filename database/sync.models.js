// Importamos modelos
const { Admin } = require("../models/admin.model.js");
const { Record } = require("../models/record.model.js");
const { Token } = require("../models/token.model.js");

// Sincronizando Modelos
async function syncModels() {
    console.log("Sincronizando modelos...");
    Token.hasOne(Record, {
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

module.exports = { syncModels };
