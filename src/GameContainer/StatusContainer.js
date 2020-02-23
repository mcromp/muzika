import React from "react";

const StatusBoard = () => {
  return (
    <div className="statusBoard">
      <span> Add display Text to this</span>
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

const StatusContainer = ({ scoreBoard }) => {
  return (
    <div className="statusContainer">
      <StatusBoard />
      <ScoreBoard scoreBoard={scoreBoard} />
    </div>
  );
};

export default StatusContainer;
