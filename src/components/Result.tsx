import React from "react";
import "./Result.css"
import characterStore from "../store/character.store.ts";
import HappyMikasa from "../assets/happy_mikasa.png"
import SadMikasa from "../assets/sad_mikasa.webp"

export default function Result(props: {won: boolean, lost: boolean}) {
    const store = characterStore()
    return(
        <div className="whiteSquare">
            <img src={props.won ? HappyMikasa : SadMikasa} alt="mikasa" className="mikasa"/>
            <h1>{props.won ? "You've won!!" : "You've lost :("}</h1>
            <h2>Today`s character is:</h2>
            <img alt="imagem do personagem de hoje" src={store.name.includes(" ") ? `https://caiobulha.github.io/aotdle-assets/${store.name.replace(" ", "_").toLowerCase()}.jpg`: `https://caiobulha.github.io/aotdle-assets/${store.name.toLowerCase()}.jpg`}/>
            <h2>{store.name}</h2>
        </div>
    )
}