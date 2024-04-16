import React from "react";
import "./AutoComplete.css"

export default function AutoComplete(props: {name: string, image: string}) {
    return(
        <div className="autocomplete">
            <img src={props.image} alt={props.name}/>
            <p>{props.name}</p>
        </div>
    )
}