import React, { useState, useEffect } from "react";
import Buttons from "../Buttons/Buttons";
import "./Hangman.css";
const axios = require("axios");

export default function Hangman() {
  let [wGuesses, setWGuesses] = useState(0);
  let [guessed, setGuessed] = useState(new Set());
  let [answer, setAnswer] = useState("");
  let [loaded, setLoaded] = useState(false);
  let [hint, setHint] = useState("");

  //showing the Guesses for example. If the word is money and [m,o,y] is guessed it will display as m o _ _ y
  let showGuess = () => {
    let split = answer.split("");
    let showGuess = split.map((inc) => (guessed.has(inc) ? inc : " _ "));
    return showGuess;
  };

  useEffect(() => {
    async function getData() {
      let response = await axios.get(
        "https://random-words-api.vercel.app/word"
      );
      setAnswer(response.data[0].word);
      setLoaded(true);
      setHint(response.data[0].definition);
    }
    return getData();
  }, [loaded]);

  //Adds guess to guessed letter state. Also adds number of wrong guesses if it is not
  let buttonClick = (e) => {
    setGuessed((prev) => new Set(prev).add(e.target.value));
    setWGuesses(wGuesses + (answer.includes(e.target.value) ? 0 : 1));
  };
  //Creating the alphabete buttons
  let alphaButtons = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map((ltr, idx) => (
      <Buttons
        letter={ltr}
        key={idx}
        value={ltr}
        click={buttonClick}
        disable={guessed.has(ltr)}
      />
    ));

  // setting a variable so that I can pass it through a terrinary operator
  let gameResults = (
    <div>
      <div className='Hangman-word'>{showGuess()}</div>
      <div>{hint}</div>
      {alphaButtons}
    </div>
  );
  // loading page
  let loading = (
    <div className='hangman-body'>
      <div className='hangman-bg hangman-flex'>
        <div className='hangman-c'></div>
        <div className='hangman-line'></div>
        <div className='hangman-r1'></div>
        <div className='hangman-r2'></div>
      </div>
    </div>
  );
  // Set the losing display
  let losing = (
    <div>
      <div>The answer is: {answer}</div>
      <div>You Lose, lmao, what are you a LOSER?</div>
    </div>
  );

  let results = (
    <div className='Hangman'>
      <h1>Hangman</h1>
      <div>Wrong Guesses:{wGuesses}/6</div>
      {wGuesses >= 6 ? losing : gameResults}
    </div>
  );

  return <div>{loaded ? results : loading}</div>;
}
