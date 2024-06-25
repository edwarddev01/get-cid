// Importamos paquetes
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { config } = require('dotenv');
config();

// Importamos archivos de conexion a la base datos
const { connection } = require('./database/connection');
const { syncModels } = require('./database/sync.models');

// Importamos rutas
const { clientRouter } = require('./routers/client.router');
const { adminRouter } = require('./routers/admin.router');

// Inicializamos express
const app = express();
app.set("trust proxy", true);

// Configuramos middlewares
app.use(cors({ origin: '*', exposedHeaders: ['Authorization'] }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('short'));

// Configuracion de rutas
app.use(clientRouter);
app.use(adminRouter);

// Inicializamos el servidor y la conexion a la base de datos
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
