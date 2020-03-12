import React from "react";
import "../App.css";

// prettier-ignore
const DISPLAY_NAMES = ["I", "IV", "V", "I", null, "???"];

const BlockMusical = ({ measure, number, handleBlockClick, name }) => {
  let classNameM = number === 5 && name !== "???" ? "mysteryBlock" : "";
  return (
    <div
      onClick={() => handleBlockClick(number)}
      className={measure === number ? "musicBlockActive" : "musicBlock"}
    >
      <span className={classNameM}>{name}</span>
    </div>
  );
};

const Blocks = ({ measure, handleBlockClick, mysteryBlock }) =>
  DISPLAY_NAMES.map((name, i) => {
    name = name === "???" ? mysteryBlock : name;
    if (!name) {
      return null;
    }
    return (
      <BlockMusical
        key={i}
        number={i}
        {...{ handleBlockClick, measure, name }}
      />
    );
  });

export default Blocks;
