import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NombreJugador (){
    const [formData, setFormData] = useState({
        nombre: ""
    });
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch('http://localhost:5000/api/players',
            {
                method:'POST',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
            );
            if(response.ok)
            {
                alert('Formulario enviado correctamente!');
                navigate('/ruleta',{state:{nombre: formData.nombre}});
            }
            else
            {
                alert('Error al enviar el formulario');
            }
        } 
        catch (error)
        {
            console.error('Error:', error);
            alert('Hubo un problema con la solicitud');
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='nombre'></label>
                <input 
                    type='text' 
                    id='nombre' 
                    value={formData.nombre} 
                    onChange={handleChange}
                    required
                />
                <input type="submit" text="Enviar" />
            </form>
        </div>
    );
}

export default NombreJugador;