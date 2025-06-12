const app = require('./app');
const { testDbConnection } = require('./config/db');
require('dotenv').config({ path: './.env' }); // Variables de entorno

const PORT = process.env.PORT || 3000;

// Probar conexion a la base de datos antes de iniciar el servidor
testDbConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
    });
});