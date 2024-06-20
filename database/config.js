//Configuraciones para bases de datos
const config = {
  development: {
    host: "65.21.238.170",
    database: "adminedw_get_cid",
    username: "adminedw_admincid",
    password: "Lorica2021+*",
    port: 3306,
    dialect: "mysql",
    logging: false,
    timezone: "-05:00",
  },
  production: {
    host: "65.21.238.170",
    database: "adminedw_get_cid",
    username: "adminedw_admincid",
    password: "Lorica2021+*",
    port: 3306,
    dialect: "mysql",
    logging: false,
    timezone: "-05:00"
  },
};
export { config };
