import React from "react";

const StatusBoard = ({ displayText }) => {
  return (
    <div className="statusBoard">
      <span> {displayText} </span>
    </div>
  );
};

const ScoreBoard = ({ scoreBoard }) => {
  return (
    <div className="scoreBoard">
      <span>{scoreBoard.avgAttempts.toFixed(1)}</span>
      <span>{Math.ceil(scoreBoard.percent * 100)}%</span>
    </div>
  );
};

const StatusContainer = ({ scoreBoard, displayText }) => {
  return (
    <div className="statusContainer">
      <StatusBoard displayText={displayText} />
      <ScoreBoard scoreBoard={scoreBoard} />
    </div>
  );
};

export default StatusContainer;
