import React, { useState, useEffect } from "react";
import Buttons from "../Buttons/Buttons";
const axios = require("axios");

export default function Hangman() {
  let [wGuesses, setWGuesses] = useState(0);
  let [guessed, setGuessed] = useState(new Set());
  let [answer, setAnswer] = useState("apple");

  //showing the Guesses for example. If the word is money and [m,o,y] is guessed it will display as m o _ _ y
  let showGuess = () => {
    let split = answer.split("");
    let showGuess = split.map((inc) => (guessed.has(inc) ? inc : " _ "));
    return showGuess;
  };

  useEffect(() => {
    async function getData() {
      let response = axios.get("https://random-words-api.vercel.app/word");
      console.log(response);
    }
    return getData();
  });

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
      <div>{showGuess()}</div>
      {alphaButtons}
    </div>
  );

  return (
    <div>
      <div>Wrong Guesses:{wGuesses}/6</div>
      <div>{guessed}</div>
      {wGuesses >= 6 ? <div>You Lose LMAOOO</div> : gameResults}
    </div>
  );
}
