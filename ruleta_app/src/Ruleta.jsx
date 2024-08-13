import React, { useState, useRef } from 'react'
import './Ruleta.css';

function Ruleta() {
    
    const[ancho,setAncho]=useState(1);
    const[rotacion,setRotaton]=useState(0);

    const barraRef=useRef(null)
    const lanzar=()=>{
        barraRef.current.classList.toggle('parate')
        const width2=barraRef.current.getBoundingClientRect().width;
        setAncho(width2)
        girar()
    }

    const girar=()=>{
        const nuevaRotacion= Math.floor(Math.random()*210)+340;
        setRotaton(rotacion + ancho + nuevaRotacion)
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
            }}>
            </div>
            <div className="premio"></div>
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
