const db = require('../config/db'); // Importar la conexión a la base de datos

const obtenerAlumnos = (callback) => {
  db.query('SELECT * FROM alumno', callback);
};

const obtenerAlumnoPorId = (id, callback) => {
  db.query('SELECT * FROM alumno WHERE id = ?', [id], callback);
};

const crearAlumno = (contenido, callback) => {
  db.query('INSERT INTO alumno (contenido) VALUES (?)', [contenido], (err, results) => {
    if (err) return callback(err);
    callback(null, { id: results.insertId, contenido });
  });
};

const actualizarAlumno = (id, contenido, callback) => {
  db.query('UPDATE alumno SET contenido = ? WHERE id = ?', [contenido, id], (err, results) => {
    if (err) return callback(err);
    if (results.affectedRows === 0) {
      return callback(new Error('Alumno no encontrado'));
    }
    callback(null, { message: 'Alumno actualizado' });
  });
};

const eliminarAlumno = (id, callback) => {
  db.query('DELETE FROM alumno WHERE id = ?', [id], (err, results) => {
    if (err) return callback(err);
    callback(null, { message: 'Alumno eliminado' });
  });
};

module.exports = {
  obtenerAlumnos,
  obtenerAlumnoPorId,
  crearAlumno,
  actualizarAlumno,
  eliminarAlumno
};