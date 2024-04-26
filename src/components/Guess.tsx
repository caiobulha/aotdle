import "./Guess.css"
import React, { useEffect, useState } from "react";
import { Character } from "../interfaces/interfaces";
import characterStore from "../store/character.store.ts";


//waste 1 life to reaveal random alias
//waste 1 life to reveal random role

export default function Guess(props: {character: Character}) {
    const [speciesIncluded, setSpeciesIncluded] = useState<boolean>(false)
    const store = characterStore()

    useEffect(() => {
        props.character.species.forEach((specie: string) => {
            store.species.includes(specie) && setSpeciesIncluded(true)
        })
    }, [])

    return(
        <div className="guessRow">

            <img src={props.character.name.includes(" ") ? `https://caiobulha.github.io/aotdle-assets/${props.character.name.replace(" ", "_").toLowerCase()}.jpg`: `https://caiobulha.github.io/aotdle-assets/${props.character.name.toLowerCase()}.jpg`} alt={props.character.name}/>
            <div style={{backgroundColor: props.character.gender === store.gender ? 'green' : 'red'}}>{props.character.gender}</div>
            <div style={{backgroundColor: props.character.age === store.age ? 'green' : 'red'}}>{props.character.age}</div>
            <div style={{backgroundColor: props.character.occupation === store.occupation ? 'green' : 'red'}}>{props.character.occupation}</div>
            <div style={{backgroundColor: props.character.status === store.status ? 'green' : 'red'}}>{props.character.status}</div>
            <div style={{backgroundColor: speciesIncluded ? 'green' : 'red'}}>{props.character.species.map(specie => (
                <p>{specie}</p>
            ))}</div>
        </div>
    )
}