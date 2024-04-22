import React, { useEffect } from "react";
import "./AutoComplete.css"

export default function AutoComplete(props: {name: string, image: string}) {

    useEffect(() => {
        console.log(props.image)
    }, [])

    return(
        <div className="autocomplete">
            <img src={props.image} alt={props.name}/>
            <p>{props.name}</p>
        </div>
    )
}