import React from "react";
import "./Buttons.css";

export default function Buttons(props) {
  return (
    <button
      className='Buttons-btns'
      onClick={props.click}
      value={props.value}
      disabled={props.disable}>
      {props.letter}
    </button>
  );
}
