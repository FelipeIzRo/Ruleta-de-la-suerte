import React, { useState, useRef } from 'react'
import './Ruleta.css';

function Ruleta() {
    
    const[ancho,setAncho]=useState(1);
    const[rotacion,setRotaton]=useState(0);
    const[premio,setPremio]=useState('Premio');
    
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

    const final=()=>{
        barraRef.current.classList.toggle('parate')
        const grados=(rotacion % 360 + 360) % 360;

        if(grados>=0 && grados <=44)
        {
            setPremio('Quiebra')
        }
        else if (grados>=45 && grados <=90)
        {
            setPremio('100 puntos')
        }
        else if (grados>=91 && grados <=135)
        {
            setPremio('50 puntos')
        }
        else if (grados>=136 && grados <=179)
        {
            setPremio('x2')
        }
        else if (grados>=180 && grados <=224)
        {
            setPremio('Pierde Turno')
        }
        else if (grados>=225 && grados <=269)
        {
            setPremio('200 puntos')
        }
        else if (grados>=270 && grados <=314)
        {
            setPremio('25 puntos')
        }
        else if (grados>=315 && grados <=359)
        {
            setPremio('Comodin')
        }
        
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
