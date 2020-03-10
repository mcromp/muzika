import React from "react";

const GuessButtons = ({ data, handleGuessClick, playing }) =>
  data.map(deg => (
    <GuessButton key={deg.name} {...{ deg, handleGuessClick, playing }} />
  ));

const GuessButton = ({ deg, handleGuessClick, playing }) => (
  <button
    value={deg.name}
    disabled={deg.disabled || playing}
    clicked={deg.clicked}
    onClick={() => handleGuessClick(deg)}
  >
    {deg.name}
  </button>
);

export default GuessButtons;
