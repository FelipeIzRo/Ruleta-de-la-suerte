const express = require('express');
const router = express.Router();
const PlayerController = require('../controllers/PlayerController');

// Ruta para crear un nuevo jugador
router.post('/players', PlayerController.createPlayer);

// Ruta para obtener todos los jugadores
router.get('/players', PlayerController.getPlayers);

// Ruta para actualizar la puntuación de un jugador
router.put('/players', PlayerController.updatePlayerScore);

// Ruta para eliminar un jugador
router.delete('/players', PlayerController.deletePlayer);

module.exports = router;
