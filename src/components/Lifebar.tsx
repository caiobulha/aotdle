import React from "react";
import "./Lifebar.css"

export default function Lifebar(props: {lives: number}) {
    return(
        <div className="lifebar">
            <p className="livesP">{props.lives}</p>
            <div className="lives glow" style={{width: `${props.lives * 10}%`}}></div>
        </div>
    )
}