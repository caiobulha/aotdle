import React from "react";
import "./Result.css"
import characterStore from "../store/character.store.ts";
import HappyMikasa from "../assets/happy_mikasa.png"
import SadMikasa from "../assets/sad_mikasa.webp"

export default function Result(props: {won: boolean, lost: boolean, closeFunction: any}) {
    const store = characterStore()
    return(
        <div style={{position: "relative"}}>
            <div className="whiteSquare">
                <img src={props.won ? HappyMikasa : SadMikasa} alt="mikas a" className="mikasa"/>
                <h1>{props.won ? "You've won!!" : "You've lost :("}</h1>
                <h2>The character was:</h2>
                <hr />
                <img alt="imagem do personagem de hoje" src={store.name.includes(" ") ? `https://caiobulha.github.io/aotdle-assets/${store.name.replace(" ", "_").toLowerCase()}.jpg`: `https://caiobulha.github.io/aotdle-assets/${store.name.toLowerCase()}.jpg`}/>
                <h2>{store.name}</h2>
                <hr />
                <h2>Reload the page to play again ;{")"}</h2>
    
                <h3 className="closeBtn" onClick={() => props.closeFunction()}>close</h3>
            </div>
        </div>
    )
}