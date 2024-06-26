//Importamos paquetes y archivos
import { Model, DataTypes } from "sequelize";
import { connection } from "../database/connection.js";

//Exportamos la clase que hereda de Model
export class Admin extends Model {}

//Inicializamos y construimos el modelo
Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secret: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    token_id: {
      type: DataTypes.STRING,
      allowNull:false
    }
  },
  {
    sequelize: connection,
    modelName: "admins",
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
      {
        unique: true,
        fields:["token_id"]
      }
    ],
  }
);
