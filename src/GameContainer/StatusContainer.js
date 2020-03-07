import React from "react";

const StatusBoard = ({ displayText }) => (
  <div className="statusBoard">
    <span> {displayText} </span>
  </div>
);

const ScoreBoard = ({ scoreBoard }) => (
  <div className="scoreBoard">
    <span>{scoreBoard.avgAttempts.toFixed(1)}</span>
    <span>{Math.ceil(scoreBoard.percent * 100)}%</span>
  </div>
);

const StatusContainer = ({ scoreBoard, displayText }) => (
  <div className="statusContainer">
    <StatusBoard {...{ displayText }} />
    <ScoreBoard {...{ scoreBoard }} />
  </div>
);

export default StatusContainer;
