const Player = require('../models/Player');

// Array en memoria para almacenar los jugadores
let players = [];

// Crear un nuevo jugador
exports.createPlayer = (req, res) => {
    const { nombre } = req.body;

    // Verifica si ya existe un jugador con el mismo nombre
    const existingPlayer = players.find(player => player.nombre === nombre);
    if (existingPlayer) {
    return res.status(400).json({ message: 'El nombre ya está en uso' });
    }

    // Crear una nueva instancia de Player
    const newPlayer = new Player(nombre);
    players.push(newPlayer);

    res.status(201).json(newPlayer);
};

// Obtener todos los jugadores
exports.getPlayers = (req, res) => {
    res.status(200).json(players);
};

// Actualizar el puntaje de un jugador
exports.updatePlayerScore = (req, res) => {
    const { nombre, puntuacion } = req.body;

    // Encontrar al jugador y actualizar su puntuación
    const player = players.find(player => player.nombre === nombre);
    if (!player) {
    return res.status(404).json({ message: 'Jugador no encontrado' });
    }

    player.puntuacion = puntuacion;
    res.status(200).json(player);
};

// Eliminar un jugador
exports.deletePlayer = (req, res) => {
    const { nombre } = req.body;

    // Filtra el array para eliminar el jugador con el nombre especificado
    players = players.filter(player => player.nombre !== nombre);

    res.status(200).json({ message: 'Jugador eliminado' });
};
