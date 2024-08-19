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
    origin: "http://localhost:3000",  // Permitir conexiones desde localhost:3000
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST']
}));

app.use(bodyParser.json());

// Configuración de las rutas API
app.get('/message', (req, res) => {
  res.json({ message: '¡Hola desde el backend!' });
});

// Configuración para servir los archivos de React en producción
app.use(express.static(path.join(__dirname, 'ruleta_app/build')));


// Iniciar el servidor
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en el puerto ${PORT}`);
// });
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.post('/jugadores', (req, res) => {
  const { numero } = req.body;
  console.log('Datos recibidos:', { numero });

  // Aquí podrías agregar la lógica para guardar los datos en una base de datos, etc.
  
  res.status(200).send('Formulario recibido');
});

io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');

  // Escuchar cuando un usuario gira la ruleta
  socket.on('spin-ruleta', () => {
    // Generar un resultado aleatorio
    const resultado = Math.floor(Math.random() * 100) + 1;

    // Enviar el resultado a todos los usuarios conectados
    io.emit('resultado-ruleta', resultado);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});


