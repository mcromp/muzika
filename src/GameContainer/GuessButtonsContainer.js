import React from "react";

const GuessButtons = ({ data, handleGuessClick, isPlaying }) =>
  data.map(deg => (
    <GuessButton key={deg.name} {...{ deg, handleGuessClick, isPlaying }} />
  ));

const GuessButton = ({ deg, handleGuessClick, isPlaying }) => (
  <button
    value={deg.name}
    disabled={deg.disabled || isPlaying}
    clicked={deg.clicked}
    onClick={() => handleGuessClick(deg)}
  >
    {deg.name}
  </button>
);

export default GuessButtons;
