//Importamos paquetes
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
config();

//Importamos archivos de conexion a la base datos
import { connection } from './database/connection.js';
import { syncModels } from './database/sync.models.js';

//Importamos rutas
import { clientRouter } from './routers/client.router.js';
import { adminRouter } from './routers/admin.router.js';

//Incializamos express
const app = express();
app.set("trust proxy", true);

//Configuramos middlewares
app.use(cors({ origin:'*', exposedHeaders:['Authorization'] }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('short'));

//Configuracion de rutas
app.use(clientRouter);
app.use(adminRouter);

//Inicializamos el servidor y la conexion a la base de datos
const port = process.env.PORT || 3100;
app.listen(port, async () => {
    try {
        console.log(`Servidor inicializado en el puerto: ${port}`);
        console.log(`Conectando a la base de datos...`);
        await connection.sync({ alter: true })
        await syncModels();
        console.log('Conexion exitosa.');
    } catch (error) {
        console.log(`Error al iniciar el servidor: ${error}`);
    }
});
