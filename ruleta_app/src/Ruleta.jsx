import React, { useState, useRef, useEffect } from 'react'
import './Ruleta.css';
import io from 'socket.io-client';

function Ruleta() {
    
    const[ancho,setAncho]=useState(1);
    const[rotacion,setRotation]=useState(0);
    const[premio,setPremio]=useState('Premio');

    const socketRef = useRef(null);    
    const barraRef=useRef(null)

    useEffect(() => {
        // Conectar al servidor de socket.io
        socketRef.current = io('http://192.168.0.154:5000');

        // Escuchar el evento de rotación de la ruleta
        socketRef.current.on('rotacion-ruleta', (data) => {
            // setRotation(data.rotacion);
            // setPremio(data.premio);
            girar(data.rotacion);
        });

        return () => {
            socketRef.current.disconnect();  // Desconectar cuando el componente se desmonte
        };
    }, []);

    const lanzar=()=>{
        barraRef.current.classList.toggle('parate')
        const width2=barraRef.current.getBoundingClientRect().width;
        setAncho(width2)
        girar(null)
    }

    const girar=(rotacionEntrada)=>{
        if (rotacionEntrada == null)
        {
            const nuevaRotacion= Math.floor(Math.random()*210)+340;
            setRotation(rotacion + ancho + nuevaRotacion)
        }
        else 
        {
            setRotation(rotacionEntrada)
        }
    }

    const final=()=>{
        barraRef.current.classList.toggle('parate')
        const grados=(rotacion % 360 + 360) % 360;
        let premio=''

        if(grados>=0 && grados <=44)
        {
            premio = 'Quiebra'
        }
        else if (grados>=45 && grados <=90)
        {
            premio = '100 puntos'
        }
        else if (grados>=91 && grados <=135)
        {
            premio = '50 puntos'
        }
        else if (grados>=136 && grados <=179)
        {
            premio = 'x2'
        }
        else if (grados>=180 && grados <=224)
        {
            premio = 'Pierde Turno'
        }
        else if (grados>=225 && grados <=269)
        {
            premio = '200 puntos'
        }
        else if (grados>=270 && grados <=314)
        {
            premio = '25 puntos'
        }
        else if (grados>=315 && grados <=359)
        {
            premio = 'Comodin'
        }

        setPremio(premio)

        // Emitir el evento de rotación de la ruleta a los demás usuarios
        socketRef.current.emit('spin-ruleta', {
            rotacion:rotacion,
            premio: premio
        });
    }

    return (
    <>
        <div className="monedas"></div>
        <div className="tiradas"></div>
        <div className="plafon">
            <div className="ruleta"
            style={{
                backgroundImage:`url('./assets/ruleta.png')`,
                transform:`rotate(${rotacion}deg)`,
                transition:"transform 6s cubic-bezier(0.2,0.8,0.7,0.99)"
            }} onTransitionEnd={final}>            
            </div>
            <div className="premio">{premio}</div>
            <div className="barra1">
                <div ref={barraRef} className='mi_barra'></div>
            </div>
            <div className="barraInferior">
                <button clasName="Lanzar" onClick={lanzar}>Lanzar</button>
            </div>
            <div className="central">
                <img src="./assets/central.png" alt="" />
            </div>
        </div>        
    </>
    )
}

export default Ruleta
