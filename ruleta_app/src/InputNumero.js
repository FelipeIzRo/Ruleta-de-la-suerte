import React, { useState } from 'react';

function InputNumero() {
    const [formData, setFormData] = useState({
        numero: 0
      });

      const manejarCambio = (e) => {
        const nuevoValor = e.target.value;
        // Validar que el valor sea un número o vacío
        if (!isNaN(nuevoValor)) {
            setFormData({
                ...formData, // Mantenemos el estado anterior (si tuvieras más campos)
                numero: nuevoValor // Actualizamos solo el campo "numero"
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Envía los datos al servidor
        try {
          const response = await fetch('http://localhost:5000/jugadores', 
            {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
            }
        );
    
          if (response.ok) {
            alert('Formulario enviado correctamente!');
          } else {
            alert('Error al enviar el formulario');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Hubo un problema con la solicitud');
        }
      };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="inputNumero">Ingrese un número:</label>
                <input
                    type="number"
                    id="inputNumero"
                    value={formData.numero}
                    onChange={manejarCambio}
                    placeholder="Escribe un número"
                />
                <input type="submit" value={formData.numero} text="Enviar" />
            </form>
            
        </div>
    );
}

export default InputNumero;
