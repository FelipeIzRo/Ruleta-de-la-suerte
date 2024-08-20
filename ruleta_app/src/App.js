import React, { useEffect, useState } from 'react';
import './App.css';
import Ruleta from './Ruleta';
// import Ruleta2 from './Ruleta2';
// import InputNumero from './InputNumero';

function App() {
  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   fetch('/message')
  //     .then(response => response.json())
  //     .then(data => setMessage(data.message))
  //     .catch(error => console.error('Error:', error));
  // }, []);

  return (
    <div className="App">
      {/* <InputNumero/> */}
      <h1>¡Gira la Ruleta!</h1>
      <Ruleta />
    </div>
  );
}

export default App;
