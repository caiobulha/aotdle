import React, { ReactElement, useEffect, useState } from 'react';
import img from "../src/assets/a.jpg"
import "./App.css"
import escudo from "../src/assets/escudo.jpg"
import Lifebar from './components/Lifebar.tsx';
import AutoComplete from './components/AutoComplete.tsx';
import { Character } from './interfaces/interfaces';

function App() {
  const [inputValue, setInputValue] = useState<string>('')
  const [guesses, setGuesses] = useState<ReactElement[]>([])
  const [characters, setCharacters] = useState<Character[]>([])
  const [character, setCharacter] = useState<any>()
  const [characterName, setCharacterName] = useState<string>('')
  const [lives, setLives] = useState<number>(10)
  const [hints, setHints] = useState<any[]>([])

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
      setHints([])
      return
    }

    var alreadyUsedNames: string[] = []
    
    var filteredCharacters = characters.filter((el) => {
      if(!alreadyUsedNames.includes(el.name)){
        alreadyUsedNames.push(el.name)
        return el.name.toLowerCase().startsWith(guess.toLowerCase())
      }
      
    })
    var hintsArr: any[] = []
    var namesArr: any[] = []

    filteredCharacters.forEach(el => {
        namesArr.push(el.name)
        hintsArr.push(<AutoComplete name={el.name} image={el.img} />)
    })

    filteredCharacters = characters.filter((el) => {
      if(!namesArr.includes(el.name)) {
        return el.name.toLowerCase().includes(guess.toLowerCase())
      }
      return null
    })

    filteredCharacters.forEach((el) => {
        hintsArr.push(<AutoComplete name={el.name} image={el.img} />)
    })

    setHints(hintsArr)
  }

  //Pegando todos para fazer o auto-complete
  useEffect(() => {
    var personas: any[] = []
    fetch(`https://api.attackontitanapi.com/characters/1,2,3,4,5,8,10,12,51,57,74,66,86,87,88,89,90,91,92,82,95,96,97,98,101,110,123,124,139,176,160,188,184,183,182`).then(res => res.json().then(data => {
    // fetch(`https://api.attackontitanapi.com/characters/188,184,98`).then(res => res.json().then(data => {
      data.forEach((element: Character) => {
        personas.push(element)
        setCharacter(data[getRandomIntInclusive(0, data.length - 1)])
        setCharacterName(data[getRandomIntInclusive(0, data.length - 1)].name)
      });
    }))
    setCharacters(personas)
    // console.log(personas)
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
