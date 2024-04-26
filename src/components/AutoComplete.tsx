import React, { useEffect } from "react";
import "./AutoComplete.css"

export default function AutoComplete(props: {name: string, onClickFunction: any}) {

    return(
        <div className="autocomplete" onClick={props.onClickFunction}>
            <img src={props.name.includes(" ") ? `https://caiobulha.github.io/aotdle-assets/${props.name.replace(" ", "_").toLowerCase()}.jpg`: `https://caiobulha.github.io/aotdle-assets/${props.name.toLowerCase()}.jpg`} alt={props.name}/>
            <p>{props.name}</p>
        </div>
    )
}