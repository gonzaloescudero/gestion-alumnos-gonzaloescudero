const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Colovelita4384',
  database: 'examen_final',
  port: 3307
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL.');
});

module.exports = db;
