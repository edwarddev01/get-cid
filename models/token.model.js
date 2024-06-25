// Importamos paquetes y archivos
const { Model, DataTypes } = require("sequelize");
const { connection } = require("../database/connection.js");

// Definimos la clase que hereda de Model
class Token extends Model {}

// Inicializamos y construimos el modelo
Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    valid: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue:1
    }
  },
  {
    modelName: "tokens",
    sequelize: connection,
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ["token"],
      },
    ],
  }
);

module.exports = { Token };
