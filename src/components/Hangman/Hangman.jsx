import React, { useState, useEffect } from "react";
import Buttons from "../Buttons/Buttons";
import "./Hangman.css";
import img0 from "../../images/img0.png";
import img1 from "../../images/img1.png";
import img2 from "../../images/img2.png";
import img3 from "../../images/img3.png";
import img4 from "../../images/img4.png";
import img5 from "../../images/img5.png";
import img6 from "../../images/img6.png";
import wrong from "../../audio/no.mp3";
import correct from "../../audio/yeah.mp3";
import winning from "../../audio/winning.mp3";
import lose from "../../audio/youreajoke.mp3";

const axios = require("axios");

export default function Hangman() {
  //states
  let [wGuesses, setWGuesses] = useState(0);
  let [guessed, setGuessed] = useState(new Set());
  let [answer, setAnswer] = useState("");
  let [loaded, setLoaded] = useState(false);
  let [hint, setHint] = useState("");

  let playCorrect = () => {
    new Audio(correct).play();
  };

  let playWrong = () => {
    new Audio(wrong).play();
  };

  let playW = new Audio(winning);

  let playWinning = () => {
    playW.play();
  };

  let pauseWinning = () => {
    playW.pause();
  };

  let playLosing = () => {
    new Audio(lose).play();
  };

  let images = [img0, img1, img2, img3, img4, img5, img6];

  //showing the Guesses for example. If the word is money and [m,o,y] is guessed it will display as m o _ _ y
  let showGuess = () => {
    let split = answer.split("");
    let showGuess = split.map((inc) => (guessed.has(inc) ? inc : " _ "));
    return showGuess;
  };
  //using Axios to hit api to get a random word
  useEffect(() => {
    async function getData() {
      let response = await axios.get(
        "https://random-words-api.vercel.app/word"
      );
      setAnswer(response.data[0].word.toLowerCase());
      setLoaded(true);
      setHint(response.data[0].definition);
    }
    return getData();
  }, [loaded]);

  //Adds guess to guessed letter state. Also adds number to wrong guesses if the guess is not included in the answer
  let buttonClick = (e) => {
    setGuessed((prev) => new Set(prev).add(e.target.value));
    setWGuesses(wGuesses + (answer.includes(e.target.value) ? 0 : 1));
    answer.includes(e.target.value) ? playCorrect() : playWrong();
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

  //Reset button to set state back to default
  let reset = () => {
    setGuessed(new Set());
    setLoaded(false);
    setWGuesses(0);
    pauseWinning();
  };

  // setting a variable so that I can pass it through a terrinary operator
  let gameResults = (
    <div>
      <div className='Hangman-word'>{showGuess()}</div>
      <div>Hint: {hint}</div>
      {answer == showGuess().join("") ? <div>You Win!</div> : alphaButtons}
      {answer == showGuess().join("") ? playWinning() : null}
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
      <div className='Hangman-img'>
        <img src={images[wGuesses]} />
      </div>
      <div>Wrong Guesses:{wGuesses}/6</div>
      {wGuesses >= 6 ? losing : gameResults}
      {wGuesses == 6 ? playLosing() : null}
      <button id='reset' onClick={reset}>
        Reset?
      </button>
    </div>
  );

  return <div>{loaded ? results : loading}</div>;
}
