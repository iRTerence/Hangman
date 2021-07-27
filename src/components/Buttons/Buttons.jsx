import React from "react";

export default function Buttons(props) {
  return (
    <div>
      <button onClick={props.click} value={props.value}>
        {props.letter}
      </button>
    </div>
  );
}
