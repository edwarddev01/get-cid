//Importamos paquetes y archivos
import { Model, DataTypes } from "sequelize";
import { connection } from "../database/connection.js";

//Exportamos la clase que hereda de Model
export class Record extends Model {}

//Inicializamos y construimos el modelo
Record.init({
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
  id_token:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  iid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  cid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
  sequelize:connection,
  modelName: "records",
  freezeTableName: true,
  indexes:[
    {
      unique: true,
      fields:["iid"]
    }
  ]
});

