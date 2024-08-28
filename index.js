const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');

const socketIo = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",  // Permitir conexiones desde localhost:3000
    methods: ["GET", "POST"]
  }
});

const playerRoutes = require('./routes/playerRoutes');
const PlayerController = require('./controllers/PlayerController');

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));

// Registrar las rutas
app.use('/api', playerRoutes);

// Configuración para servir los archivos de React en producción
app.use(express.static(path.join(__dirname, 'ruleta_app/build')));


// Iniciar el servidor
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');

    // Escuchar cuando un usuario gira la ruleta
    socket.on('spin-ruleta', (data) => {
        // Emitir el resultado de la ruleta a todos los usuarios conectados
        io.emit('rotacion-ruleta', data);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});


