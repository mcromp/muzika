import React from "react";

export const setupGuessButtons = (data, answer, setDegreeBtnData) => {
  let degreeArr = data.map(name => ({
    name: name.degree,
    correct: answer === name.degree,
    clicked: "false",
    note: name.degreeNote
  }));
  setDegreeBtnData(degreeArr);
};

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
