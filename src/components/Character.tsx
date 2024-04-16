import "Character.css"
import React from "react";

export default function Character(props: {
    alias: string, 
    name: string, 
    img: string, 
    gender: string, 
    ocupation: string, 
    species: string[], 
    status: string, 
    age: number,
    hint: string
}) {
    return(
        <div className="character">
            
        </div>
    )
}