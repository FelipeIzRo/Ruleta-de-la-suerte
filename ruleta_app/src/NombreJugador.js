import React, { useState, useEffect} from 'react';
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
function TodosJugadores() {
    const [players, setPlayers] = useState([]);

    const getPlayers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/players', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json(); // Suponiendo que el servidor devuelve un JSON con la lista de jugadores
                setPlayers(data);
            } else {
                alert('Error al obtener la lista de jugadores');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema con la solicitud');
        }
    };

    // Llama a getPlayers cuando el componente se monta y cada 5 segundos
    useEffect(() => {
        getPlayers();
        const interval = setInterval(getPlayers, 5000); // Actualiza cada 5 segundos

        return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
    }, []);

    return (
        <div>
            <p>Jugadores Conectados</p>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>{player.nombre}</li> // Suponiendo que cada jugador tiene un campo `nombre`
                ))}
            </ul>
        </div>
    );
}
export { NombreJugador, TodosJugadores };