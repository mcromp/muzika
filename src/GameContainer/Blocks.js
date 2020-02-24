import React from "react";
import "../App.css";

const BlockMusical = ({ measure, number, handleBlockClick, children }) => {
  let classNameM = "";
  number === 5 && children !== "???" && (classNameM = "mysteryBlock");
  return (
    <div
      onClick={() => handleBlockClick(number)}
      className={measure === number ? "musicBlockActive" : "musicBlock"}
    >
      <span className={classNameM}>{children}</span>
    </div>
  );
};

const BlockEmpty = () => {
  return <div></div>;
};

const Blocks = ({ measure, handleBlockClick, questionBlock }) => {
  // prettier-ignore
  const displayNames = ["I", "IV", "V", "I", 0, "???"]

  return displayNames.map((blockname, i) => {
    let name = blockname;
    if (blockname === "???") {
      name = questionBlock;
    }
    if (!blockname) {
      return <BlockEmpty key={i} />;
    }
    return (
      <BlockMusical
        measure={measure}
        key={i}
        number={i}
        handleBlockClick={handleBlockClick}
      >
        {name}
      </BlockMusical>
    );
  });
};

export default Blocks;
