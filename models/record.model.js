// Importamos paquetes y archivos
const { Model, DataTypes } = require("sequelize");
const { connection } = require("../database/connection.js");

// Definimos la clase que hereda de Model
class Record extends Model {}

// Inicializamos y construimos el modelo
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

module.exports = { Record };
