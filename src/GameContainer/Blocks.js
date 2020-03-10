import React from "react";
import "../App.css";

// prettier-ignore
const DISPLAY_NAMES = ["I", "IV", "V", "I", null, "???"];

const BlockMusical = ({ measure, number, handleBlockClick, name }) => {
  let classNameM = "";
  number === 5 && name !== "???" ? (classNameM = "mysteryBlock") : "";
  return (
    <div
      onClick={() => handleBlockClick(number)}
      className={measure === number ? "musicBlockActive" : "musicBlock"}
    >
      <span className={classNameM}>{name}</span>
    </div>
  );
};

const Blocks = ({ measure, handleBlockClick, questionBlock }) => {
  return DISPLAY_NAMES.map((name, i) => {
    name = name === "???" ? questionBlock : name;
    return name ? (
      <BlockMusical
        key={i}
        number={i}
        {...{ handleBlockClick, measure, name }}
      />
    ) : null;
  });
};

export default Blocks;
