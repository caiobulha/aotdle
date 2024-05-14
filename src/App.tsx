import React, { useEffect, useState, useRef } from 'react';
import img from "../src/assets/a.jpg"
import "./App.css"
import escudo from "../src/assets/escudo.jpg"
import Lifebar from './components/Lifebar.tsx';
import AutoComplete from './components/AutoComplete.tsx';
import { Character } from './interfaces/interfaces';
import Airplane from "../src/assets/send.png"
import characterStore from './store/character.store.ts';
import Lupa from "./assets/lupa.png"
import ConfettiExplosion from 'react-confetti-explosion';
import Guess from './components/Guess.tsx';
import Result from './components/Result.tsx';

function App() {
  const [guesses, setGuesses] = useState<any[]>([])
  const [characters, setCharacters] = useState<Character[]>([])
  const [lives, setLives] = useState<number>(10)
  const [hints, setHints] = useState<any[]>([])
  const [isExploding, setIsExploding] = useState<boolean>(false)
  const [dinamicCharactersObject, setDinamicCharactersObject] = useState<any>()
  const [won, setWon] = useState<boolean>(false);
  const [lost, setLost] = useState<boolean>(false);
  const [actualHint, setActualHint] = useState<number>(0)
  const [hintsBlackList, setHintsBlackList] = useState<string[]>([])

  const input: any = useRef()

  const store = characterStore()

  function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }

  const makeGuess = (name: string) => {
    hintsBlackList.push(name)
    if (store?.name === name) {
      clearInput()
      setIsExploding(true)
      setWon(true)
      setTimeout(() => {
        setIsExploding(false)
      }, 3000)
      return
    }

    var character: Character = dinamicCharactersObject[name]
    setGuesses([...guesses, <Guess character={character} species={character.species}/>])
    setLives(lives - 1)

    if(lives === 1) {
      setLost(true)
    } 

    clearInput()
  }

  async function handleKeyDown(event) {    
    if(event.key === "Enter") { 
        if(hints.length > 0) {
          makeGuess(hints[actualHint].name)
          setActualHint(0)
        }
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault()
    }

    if(event.key === "ArrowUp") {
      if(actualHint === 0) {
        return
      } else {
        setActualHint(actualHint - 1)
      }
    }

    if(event.key === "ArrowDown") {
      if(actualHint === hints.length - 1) {
        setActualHint(0)
      } else {
        setActualHint(actualHint + 1)
      }
    }
  }

  const clearInput = () => {
    if(input) {
      input.current.value = ""
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
      if(!hintsBlackList.includes(el.name)) { 
        if(!alreadyUsedNames.includes(el.name)){
          alreadyUsedNames.push(el.name)
          return el.name.toLowerCase().startsWith(guess.toLowerCase())
        }
        return null
      }
      return null
    })

    var hintsArr: any[] = []
    var namesArr: any[] = []

    filteredCharacters.forEach(el => {
        namesArr.push(el.name)
        hintsArr.push({
          "name": el.name,
          "onClickFunction": () => makeGuess(el.name)
        })
    })

    filteredCharacters = characters.filter((el) => {
      if(!hintsBlackList.includes(el.name)) {
        if(!namesArr.includes(el.name)) {
          return el.name.toLowerCase().includes(guess.toLowerCase())
        }
        return null
      }
      return null
    })

    filteredCharacters.forEach((el) => {
        hintsArr.push({
          "name": el.name,
          "onClickFunction": () => makeGuess(el.name)
        })
    })

    setHints(hintsArr)
  }

  useEffect(() => {
    var personas: any[] = []
    var dinamicCharactersObjectVariable = {}
    fetch(`https://api.attackontitanapi.com/characters/1,2,3,4,5,8,10,12,51,57,74,66,86,87,88,89,90,91,92,82,95,96,97,98,101,110,123,124,139,176,160,188,184,183,182`).then(res => res.json().then(data => {
      var n = getRandomIntInclusive(0, data.length-1)
      store.setName(data[n].name)
      store.setAge(data[n].age)
      store.setGender(data[n].gender)
      store.setOccupation(data[n].occupation)
      store.setSpecies(data[n].species)
      store.setStatus(data[n].status)
      store.setImg(data[n].img)
      
      data.forEach((c: Character) => {
        personas.push(c)
        dinamicCharactersObjectVariable[c.name] = c
      });
    }))
    setCharacters(personas)
    setDinamicCharactersObject(dinamicCharactersObjectVariable)
  }, [])

  return (
    <div className="App">
      {characters.length > 30 && 
        <>
        <div className="absolute">{isExploding && <ConfettiExplosion particleSize={15} particleCount={400}/>}</div>
        {(won || lost) && <Result won={won} lost={lost} closeFunction={() => {
          setWon(false)
          setLost(false)
        }}/>}
        <div className="game" style={{backgroundImage: `url(${img})`}}>
        <div className="header">
          <img src={escudo} className='img' alt='algm me ajuda pfv'/>
          <h1 className='dle'><i>Attack on Titandle</i></h1>
        </div>
        <div className='guessWrapper'>
          <div className="inputWrapper">
            <input type="text" placeholder='try mikasa...' style={{backgroundImage: `url(${Lupa})`}} ref={input} onChange={(e) => {
              filterCharacters(e.target.value)
            }
            }  onKeyDown={(e) => handleKeyDown(e)}/>
            {hints.length > 0 && 
            <div className='hints'>
              {hints.map((el, i) => (
                <AutoComplete isSelected={actualHint === i} name={el.name} onClickFunction={() => makeGuess(el.name)}/>
              ))}
            </div>
            }
          </div>
          <img src={Airplane} onClick={() => makeGuess(hints && hints[0].props.name)} alt='botao para fazer uma tentativa' className='aviao'/>
        </div>
        <Lifebar lives={lives}/>
        <div className="labels">
          <p>image</p>
          <p>gender</p>
          <p>age</p>
          <p>occupation</p>
          <p>status</p>
          <p>species</p>
        </div>
        <div className="guesses">
          {guesses}
        </div>
       </div>
        </>
      }
    </div>
  );
}

export default App;
