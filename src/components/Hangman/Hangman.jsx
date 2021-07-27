import React, { useState } from "react";
import Buttons from "../Buttons/Buttons";

export default function Hangman() {
  let [wGuesses, setWGuesses] = useState(0);
  let [guessed, setGuessed] = useState(new Set());
  let [answer, setAnswer] = useState("apple");

  let showGuess = () => {
    let split = answer.split("");
    let showGuess = split.map((inc) => (guessed.has(inc) ? inc : " _ "));
    return showGuess;
  };

  let buttonClick = (e) => {
    console.log(e.target.value);
  };

  let alphaButtons = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map((ltr, idx) => (
      <Buttons letter={ltr} key={idx} value={ltr} click={buttonClick} />
    ));

  return (
    <div>
      <div>adsfdasf 3124</div>
      <div>{showGuess()}</div>
      {alphaButtons}
    </div>
  );
}
