const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

// Configuración de las rutas API
app.get('/message', (req, res) => {
  res.json({ message: '¡Hola desde el backend!' });
});

// Configuración para servir los archivos de React en producción
app.use(express.static(path.join(__dirname, 'ruleta_app/build')));


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.post('/jugadores', (req, res) => {
  const { numero } = req.body;
  console.log('Datos recibidos:', { numero });

  // Aquí podrías agregar la lógica para guardar los datos en una base de datos, etc.
  
  res.status(200).send('Formulario recibido');
});
