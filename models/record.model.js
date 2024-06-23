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
  id_token:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  iid: {
    type: DataTypes.STRING,
    allowNull: false,
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

