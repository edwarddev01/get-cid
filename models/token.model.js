//Importamos paquetes y archivos
import { Model, DataTypes } from "sequelize";
import { connection } from "../database/connection.js";

//Exportamos la clase que hereda de Model
export class Token extends Model {}

//Inicializamos y construimos el modelo
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
