import "./Guess.css"
import React, { useEffect, useState } from "react";
import { Character } from "../interfaces/interfaces";


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
    const [bigger, setBigger] = useState<boolean>(false)
    const [species, setSpecies] = useState<string[]>([]);
    const [gender, setGender] = useState<string>("");
    const [age, setAge] = useState<number>(0);
    const [occupation, setOccupation] = useState<string>("");
    const [birthplace, setBirthplace] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    useEffect(() => {
        fetch(`https://api.attackontitanapi.com/characters/${props.id}`).then(res => res.json().then((data: Character) => {
            setStatus(data.status)
            setSpecies(data.species)
            setGender(data.gender)
            setAge(data.age)
            setOccupation(data.occupation)
            setBirthplace(data.birthplace)
            if()
        })) 
    }, [])

    return(
        <div className="guessRow">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}