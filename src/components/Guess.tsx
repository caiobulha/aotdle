import "./Guess.css"
import React, { useEffect, useState } from "react";
import { Character } from "../interfaces/interfaces";
import characterStore from "../store/character.store";


//waste 1 life to reaveal random alias
//waste 1 life to reveal random role

//colocar
//species
//gender
//age
//occupation
//birthplace
//status

export default function Guess(props: {id: number}) {
    const [species, setSpecies] = useState<string[]>([]);
    const [gender, setGender] = useState<string>("");
    const [age, setAge] = useState<number>(0);
    const [occupation, setOccupation] = useState<string>("");
    const [birthplace, setBirthplace] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [speciesIncluded, setSpeciesIncluded] = useState<boolean>(false)
    const store = characterStore()

    useEffect(() => {
        fetch(`https://api.attackontitanapi.com/characters/${props.id}`).then(res => res.json().then((data: Character) => {
            setStatus(data.status)
            setSpecies(data.species)
            setGender(data.gender)
            setAge(data.age)
            setOccupation(data.occupation)
            setBirthplace(data.birthplace)
            data.species.forEach((specie: string) => {
                store.species.includes(specie) && setSpeciesIncluded(true)
            })
        })) 
    }, [])

    return(
        <div className="guessRow">
            <div style={{backgroundColor: gender === store.gender ? 'green' : 'red'}}>{gender}</div>
            <div style={{backgroundColor: age === store.age ? 'green' : 'red'}}>{age}</div>
            <div style={{backgroundColor: occupation === store.occupation ? 'green' : 'red'}}>{occupation}</div>
            <div style={{backgroundColor: status === store.status ? 'green' : 'red'}}>{status}</div>
            <div style={{backgroundColor: speciesIncluded ? 'green' : 'red'}}>{species.map(specie => (
                <p>{specie}</p>
            ))}</div>
            <div style={{background: birthplace === store.birthplace ? 'green' : 'red'}}>{birthplace}</div>
        </div>
    )
}