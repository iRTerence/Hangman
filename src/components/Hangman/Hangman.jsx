import React, { useState } from "react";
import Buttons from "../Buttons/Buttons";

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

  //Adds guess to guessed letter state. Also adds number of wrong guesses if it is not
  let buttonClick = (e) => {
    setGuessed((prev) => new Set(prev).add(e.target.value));
    setWGuesses(wGuesses + (answer.includes(e.target.value) ? 0 : 1));
  };

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

  let gameResults = (
    <div>
      <div>{showGuess()}</div>;{alphaButtons}
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
