const express = require('express');
const router = express.Router();
const alumnoService = require('../services/alumnoService');
const db = require('../config/db');

router.get('/alumnos', (req, res) => {
  alumnoService.obtenerAlumnos((err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.get('/alumnos/:id', (req, res) => {
  const id = req.params.id;
  alumnoService.obtenerAlumnoPorId(id, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

router.post('/alumnos', (req, res) => {
  const { contenido } = req.body;
  if (!contenido || contenido.trim() === '') {
    res.status(400).json({ message: 'El campo contenido es obligatorio' });
    return;
  }
  alumnoService.crearAlumno(contenido, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.put('/alumnos/:id', (req, res) => {
  const id = req.params.id;
  const { contenido } = req.body;
  alumnoService.actualizarAlumno(id, contenido, (err, result) => {
    if (err) {
      if (err.message === 'Alumno no encontrado') {
        res.status(404).json({ message: err.message });
      } else {
        res.status(500).json({ message: 'Error en el servidor al actualizar' });
      }
      return;
    }
    res.json(result);
  });
});

router.delete('/alumnos/:id', (req, res) => {
  const id = req.params.id;
  alumnoService.eliminarAlumno(id, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.post('/reset-auto-increment', (req, res) => {
  const checkEmptyQuery = 'SELECT COUNT(*) AS count FROM alumno';
  db.query(checkEmptyQuery, (err, results) => {
    if (err) throw err;

    const count = results[0].count;
    if (count === 0) {
      const resetQuery = 'ALTER TABLE alumno AUTO_INCREMENT = 1';
      db.query(resetQuery, (err) => {
        if (err) throw err;
        res.json({ message: 'AUTO_INCREMENT reiniciado a 1 porque la tabla está vacía' });
      });
    } else {
      res.json({ message: 'La tabla no está vacía, no se reinició AUTO_INCREMENT' });
    }
  });
});

module.exports = router;
