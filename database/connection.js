//Importamos paquetes y archivos
import { Sequelize } from "sequelize";
import { config } from "./config.js";
import "dotenv/config";


//Creamos la conexion a la base de datos
const mode = process.env.MODE || 'development';
export const connection = new Sequelize(config[mode]);