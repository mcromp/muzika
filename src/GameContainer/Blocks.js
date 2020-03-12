import React from "react";
import "../App.css";

// prettier-ignore
const DISPLAY_NAMES = ["I", "IV", "V", "I", null, "mystery"];

const Block = ({ measure, number, handleBlockClick, displayName }) => {
  let classNameM = number === 5 && displayName !== "???" ? "mysteryBlock" : "";
  return (
    <div
      onClick={() => handleBlockClick(number)}
      className={measure === number ? "musicBlockActive" : "musicBlock"}
    >
      <span className={classNameM}>{displayName}</span>
    </div>
  );
};

const Blocks = ({ measure, handleBlockClick, mysteryBlockDisplay }) =>
  DISPLAY_NAMES.map((displayName, i) => {
    displayName = displayName === "mystery" ? mysteryBlockDisplay : displayName;
    return displayName ? (
      <Block
        key={i}
        number={i}
        {...{ handleBlockClick, measure, displayName }}
      />
    ) : null;
  });

export default Blocks;
