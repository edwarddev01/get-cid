//Importamos paquetes y archivos
import { Model, DataTypes } from "sequelize";
import { connection } from "../database/connection";

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
  token:{
    type: DataTypes.TEXT,
    allowNull: false,
  },
  a: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  b: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  c: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  d: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  e: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  f: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  g: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  h: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  iid: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  cid: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
