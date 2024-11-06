const express = require('express');
const app = express();
const alumnoController = require('./controllers/alumnoController'); // Importar el controlador

app.use(express.json());

app.use('/', alumnoController);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});