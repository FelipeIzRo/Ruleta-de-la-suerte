const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de las rutas API
app.get('/api/message', (req, res) => {
  res.json({ message: '¡Hola desde el backend!' });
});

// Configuración para servir los archivos de React en producción
app.use(express.static(path.join(__dirname, 'ruleta_app/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'ruleta_app/build', 'index.html'));
  //res.json({ message: '¡Path no valido!' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
