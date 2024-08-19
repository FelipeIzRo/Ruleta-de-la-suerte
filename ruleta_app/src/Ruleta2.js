import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';


const socket = io('http://192.168.1.154:5000', {
    transports: ['polling']
  });

function Ruleta2() {
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    // Escuchar el resultado desde el servidor
    socket.on('resultado-ruleta', (resultado) => {
      setResultado(resultado);
    });

    return () => {
      socket.off('resultado-ruleta');
    };
  }, []);

  const girarRuleta = () => {
    // Emitir el evento de giro de ruleta al servidor
    socket.emit('spin-ruleta');
  };

  return (
    <div>
      <button onClick={girarRuleta}>Girar Ruleta</button>
      {resultado && <p>Resultado: {resultado}</p>}
    </div>
  );
}

export default Ruleta2;
