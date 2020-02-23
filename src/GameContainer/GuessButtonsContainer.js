import React from "react";

export const setupGuessButtons = (data, answer, setDegreeBtnData) => {
  let degreeArr = data.map((name, i) => {
    let correct = answer === name.degree;
    return {
      name: name.degree,
      correct,
      clicked: "false",
      note: name.degreeNote
    };
  });
  setDegreeBtnData(degreeArr);
};

const GuessButtons = ({ data, handleGuessClick, playing }) => {
  let arr = null;
  if (data) {
    arr = data.map((deg, i) => (
      <GuessButton
        key={i}
        deg={deg}
        handleGuessClick={handleGuessClick}
        playing={playing}
      />
    ));
  }
  return arr;
};

export const GuessButton = ({ deg, handleGuessClick, playing }) => {
  const dis = deg.disabled || playing;
  return (
    <button
      value={deg.name}
      disabled={dis}
      clicked={deg.clicked}
      onClick={() => handleGuessClick(deg)}
    >
      {deg.name}
    </button>
  );
};

export default GuessButtons;
