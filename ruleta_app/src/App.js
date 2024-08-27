import React, { useState } from 'react';
import './App.css';
import Ruleta from './Ruleta';
import NombreJugador from './NombreJugador';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';


function App() {

  const [showRuleta, setShowRuleta] = useState(false);

  const handleFormSubmit = () => {
    console.log('Formulario enviado, cambiando a Ruleta...');
    setShowRuleta(true); // Cambia a mostrar la Ruleta
  };

  return (
    <Router>
        <Routes>
            <Route path="/" element={<NombreJugador />} />
            <Route path="/ruleta" element={<Ruleta />} />
        </Routes>
    </Router>
  );
}

export default App;
