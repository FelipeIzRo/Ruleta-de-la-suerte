import React, { useState } from 'react';
import './App.css';
import Ruleta from './Ruleta';
import { NombreJugador, TodosJugadores } from './NombreJugador';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';


function App() {

  const [showRuleta, setShowRuleta] = useState(false);
  

  return (
    <Router>
      <div>
        <TodosJugadores/>
      </div>
        <Routes>
            <Route path="/" element={<NombreJugador />} />
            <Route path="/ruleta" element={<Ruleta />} />            
        </Routes>        
    </Router>
  );
}

export default App;
