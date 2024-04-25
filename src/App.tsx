import React, { ReactElement, useEffect, useState } from 'react';
import img from "../src/assets/a.jpg"
import "./App.css"
import escudo from "../src/assets/escudo.jpg"
import Lifebar from './components/Lifebar.tsx';
import AutoComplete from './components/AutoComplete.tsx';
import { Character } from './interfaces/interfaces';
import Airplane from "../src/assets/send.png"
import characterStore from './store/character.store.ts';
import Lupa from "./assets/lupa.png"

function App() {
  const [inputValue, setInputValue] = useState<string>('')
  const [guesses, setGuesses] = useState<ReactElement[]>([])
  const [characters, setCharacters] = useState<Character[]>([])
  const [characterName, setCharacterName] = useState<string>('')
  const [lives, setLives] = useState<number>(10)
  const [hints, setHints] = useState<any[]>([])
  const store = characterStore()

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
    var input =  document.querySelector(".input")
    if(input) {
      input.textContent = ""
    }
    setHints([])
  }

  const filterCharacters = async (guess: string) => {
    if(guess.length < 2) {
      setHints([])
      return
    }

    var alreadyUsedNames: string[] = []
    
    var filteredCharacters = characters.filter((el) => {
      if(!alreadyUsedNames.includes(el.name)){
        alreadyUsedNames.push(el.name)
        return el.name.toLowerCase().startsWith(guess.toLowerCase())
      }
      return null
    })

    var hintsArr: any[] = []
    var namesArr: any[] = []

    filteredCharacters.forEach(el => {
        namesArr.push(el.name)
        hintsArr.push(<AutoComplete name={el.name}/>)
    })

    filteredCharacters = characters.filter((el) => {
      if(!namesArr.includes(el.name)) {
        return el.name.toLowerCase().includes(guess.toLowerCase())
      }
      return null
    })

    filteredCharacters.forEach((el) => {
        hintsArr.push(<AutoComplete name={el.name}/>)
    })

    setHints(hintsArr)
  }

  
  useEffect(() => {
    var personas: any[] = []
    fetch(`https://api.attackontitanapi.com/characters/1,2,3,4,5,8,10,12,51,57,74,66,86,87,88,89,90,91,92,82,95,96,97,98,101,110,123,124,139,176,160,188,184,183,182`).then(res => res.json().then(data => {
      setCharacterName(data[getRandomIntInclusive(0, data.length - 1)].name)
      data.forEach((c: Character) => {
        personas.push(c)
        store.setAge(c.age)
        store.setBirthplace(c.birthplace)
        store.setGender(c.gender)
        store.setOccupation(c.occupation)
        store.setSpecies(c.species)
        store.setStatus(c.status)
      });
    }))
    setCharacters(personas)
  }, [])

  return (
    <div className="App">
      <div className="game" style={{backgroundImage: `url(${img})`}}>
        <div className="header">
          <img src={escudo} className='img' alt='algm me ajuda pfv'/>
          <h1 className='dle'><i>Attack on Titandle</i></h1>
        </div>
        <div className='guessWrapper'>
          <div className="inputWrapper">
            <input type="text" placeholder='try mikasa...' style={{backgroundImage: `url(${Lupa})`}} onChange={(e) => {
              setInputValue(e.target.value)
              filterCharacters(e.target.value)
            }
            }/>
            {hints.length > 0 && 
            <div className='hints'>
              {hints}
            </div>
            }
          </div>
          <img src={Airplane} onClick={makeGuess} alt='botao para fazer uma tentativa' className='aviao'/>
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
