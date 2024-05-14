import "./Guess.css"
import React, { useEffect, useState } from "react";
import { Character } from "../interfaces/interfaces";
import characterStore from "../store/character.store.ts";


//waste 1 life to reaveal random alias
//waste 1 life to reveal random role

export default function Guess(props: {character: Character, species: string[]}) {
    const [speciesIncluded, setSpeciesIncluded] = useState<number>(0)
    const [shouldRender, setShouldRender] = useState<boolean>(false)
    const store = characterStore()

    useEffect(() => {
        var includes = true

        if(props.species.length >= store.species.length) {
            props.species.forEach(specie => { 
                if(!store.species.includes(specie)) {
                    includes = false
                }
            })
        }
        else {
            store.species.forEach(specie => {
                if(!props.species.includes(specie)) {
                    includes = false
                }
            })
        }

        if(includes) {
            setSpeciesIncluded(2)
        }
        else {
            setSpeciesIncluded(1)
        }
        setShouldRender(true)
    }, [])

    return(
        <>
            {shouldRender && 
                <div className="guessRow">
                    <img src={props.character.name.includes(" ") ? `https://caiobulha.github.io/aotdle-assets/${props.character.name.replace(" ", "_").toLowerCase()}.jpg`: `https://caiobulha.github.io/aotdle-assets/${props.character.name.toLowerCase()}.jpg`} alt={props.character.name}/>
                    <div style={{backgroundColor: props.character.gender === store.gender ? 'green' : 'red'}}>{props.character.gender}</div>
                    <div style={{backgroundColor: props.character.age === store.age ? 'green' : 'red'}}>{props.character.age}</div>
                    <div style={{backgroundColor: props.character.occupation === store.occupation ? 'green' : 'red'}}>{props.character.occupation}</div>
                    <div style={{backgroundColor: props.character.status === store.status ? 'green' : 'red'}}>{props.character.status}</div>
                    <div style={{backgroundColor: speciesIncluded === 1 ? 'yellow' : speciesIncluded === 2 ? "green" : 'red'}}>{props.character.species.map(specie => (
                        <p>{specie}</p>
                    ))}</div>
                </div> 
            }
        </>
    )
}