import React from "react";

export default function Buttons(props) {
  return (
    <button onClick={props.click} value={props.value} disabled={props.disable}>
      {props.letter}
    </button>
  );
}
