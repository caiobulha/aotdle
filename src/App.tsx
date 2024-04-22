import React, { ReactElement, useEffect, useState } from 'react';
import img from "../src/assets/a.jpg"
import "./App.css"
import escudo from "../src/assets/escudo.jpg"
import Character from './components/Character';
import Lifebar from './components/Lifebar.tsx';
import AutoComplete from './components/AutoComplete.tsx';

function App() {
  const [inputValue, setInputValue] = useState<string>('')
  const [guesses, setGuesses] = useState<ReactElement[]>([])
  const [characters, setCharacters] = useState<any[]>([])
  const [character, setCharacter] = useState<any>()
  const [characterName, setCharacterName] = useState<string>('')
  const [lives, setLives] = useState<number>(7)
  const [hints, setHints] = useState<ReactElement[]>([])
  const [ controlArray, setControlArray ] = useState<string[]>([])

  function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }

  const makeGuess = () => {
    if (characterName.includes(inputValue)) {
      console.log("acertoiu")
    }
  }

  const clearInput = (guess: string) => {
    var input =  document.querySelector(".inputt")
    if(input) {
      input.textContent = ""
    }
    setHints([])
  }

  const filterCharacters = async (guess: string) => {
    if(guess.length < 3) {
      clearInput(guess)
      return
    } 

    
    
  }

  //Pegando todos para fazer o auto-complete
  useEffect(() => {
    var personas: any[] = []
    fetch(`https://api.attackontitanapi.com/characters/1,2,3,4,5,8,10,12,51,57,74,66,86,87,88,89,90,91,92,82,95,96,97,98,101,110,123,124,139,176,160,188,184,183,182`).then(res => res.json().then(data => {
      data.forEach((element: any) => {
        personas.push(element)
        setCharacter(data[getRandomIntInclusive(0, data.length - 1)])
        setCharacterName(data[getRandomIntInclusive(0, data.length - 1)].name)
      });
    }))
    setCharacters(personas)
    console.log(personas)
  }, [])

  return (
    <div className="App">
      <div className="game" style={{backgroundImage: `url(${img})`}}>
        <div className="header">
          <img src={escudo} className='img' alt='algm me ajuda pfv'/>
          <h1 className='dle'><i>Attack on Titandle</i></h1>
        </div>
        <div className="guess">
          <div className="input">
            <input type="text" className='inputt' placeholder="Enter your guess" onChange={(e) => {
              setInputValue(e.target.value)
              filterCharacters(e.target.value)
              }}/>

          </div>

          {hints.length > 0 && <div className="hints">
              {hints}
            </div>}
          
          <button>GO!</button>
        </div>
        <Lifebar lives={lives}/>
        <div className="guesses">
          {guesses}
        </div>
      </div>
    </div>
  );
}

export default App;
