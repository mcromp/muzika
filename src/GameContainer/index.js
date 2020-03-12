import React, { useState, useCallback, useEffect, useRef } from "react";
import "../App.css";
import Tone from "tone";
import noteData from "./noteData";
import Blocks from "./Blocks";
import GuessButtons from "./GuessButtonsContainer";
import StatusContainer from "./StatusContainer";
// prettier-ignore
import { createLoop, createSingleLoop, loadChords, loadSingleChord } from "./loadMusicLoopData";

const UserButton = ({ children, handleClick, isPlaying }) => (
  <button disabled={isPlaying} onClick={handleClick}>
    {children}
  </button>
);

const GameContainer = () => {
  // prettier-ignore
  const [scoreBoard, setScoreBoard] = useState({correct: 0, total: 0, percent: "", avgAttempts: 0});
  const [degreeBtnData, setDegreeBtnData] = useState([]);
  const [measure, setMeasure] = useState("off");
  const [isPlaying, setIsPlaying] = useState(true);
  const [mysteryBlock, setMysteryBlock] = useState("???");
  const [displayText, setDisplayText] = useState(
    "Game Initiated: Click 'PLAY' hear the musical progression. Then guess a degree"
  );
  const musicData = useRef({});
  const isCorrectRef = useRef(false);

  Tone.Transport.timeSignature = [3, 4];
  Tone.Transport.bpm.value = 400;

  //useCallback invoked to prevent infinite looping from intial useEffect
  const newKey = useCallback(() => {
    let newKeyData = noteData();
    setMusicRef(newKeyData);
    setupGuessButtons(
      newKeyData.chordDegreeData,
      newKeyData.mysteryNote.chordDegree,
      setDegreeBtnData
    );
  }, []);

  //useEffect to initialize game
  useEffect(() => {
    newKey();
    setTimeout(() => {
      setIsPlaying(false);
    }, 900);
  }, [newKey]);

  const setMusicRef = data => {
    console.log(data);
    musicData.current = data;
  };

  const setIsCorrectRef = isCorrect => {
    isCorrectRef.current = isCorrect;
  };

  const setupScoreBoard = num => {
    setScoreBoard(prevState => {
      prevState.correct += num;
      prevState.total++;
      prevState.attempts++;
      prevState.percent = prevState.correct / prevState.total;
      if (num === 1) {
        prevState.avgAttempts = prevState.total / prevState.correct;
      }

      return prevState;
    });
  };

  const setupGuessButtons = (chordDegreedata, answer, setDegreeBtnData) => {
    let chordDegreeDataUpdated = chordDegreedata.map(degree => ({
      name: degree.name,
      correct: answer === degree.name,
      clicked: "false",
      note: degree.note
    }));
    setDegreeBtnData(chordDegreeDataUpdated);
  };

  const handleCorrect = () => {
    setDisplayText("Correct!");
    setIsCorrectRef(true);
    loadAndPlayTransport();
    setMysteryBlock(musicData.current.mysteryNote.chordDegree);
    setupScoreBoard(1);
    newKey();
  };

  const playAfterCorrect = () => {
    setDisplayText("New Key, Guess a degree");
    setMysteryBlock("???");
    setIsCorrectRef(false);
    loadAndPlayTransport();
  };

  const handleIncorrect = data => {
    setDisplayText(`${data.name} is incorrect`);
    setupScoreBoard(0);
    loadSingleChord(data.note);
    playTransport();
  };

  const handleChangeKey = () => {
    setDisplayText("Key Changed");
    newKey();
    loadAndPlayTransport();
  };

  const loadAndPlayTransport = () => {
    Tone.Transport.cancel();
    setMeasure(0);
    createLoop(setMeasure, setIsPlaying, isCorrectRef, playAfterCorrect);
    loadChords(musicData.current);
    playTransport();
  };

  const playTransport = (time = "+0.2") => {
    Tone.Transport.stop();
    Tone.Transport.start(time);
  };

  const handleBlockClick = number => {
    if (isPlaying) {
      return;
    }
    Tone.Transport.cancel();
    setMeasure(number);
    let chord = [];
    number !== 5
      ? (chord = musicData.current.chords[number])
      : (chord = [musicData.current.mysteryNote.note]);
    createSingleLoop(setMeasure);
    loadSingleChord(chord);
    playTransport();
  };

  const disableWrongDegreeBtn = name => {
    setDegreeBtnData(prevState => {
      let updatedState = [...prevState];
      updatedState.map(deg => {
        if (deg.name === name) {
          deg.disabled = true;
        }
        return deg;
      });
      return updatedState;
    });
  };

  const handleGuessClick = (clickedDegreeData, isPlaying) => {
    if (isPlaying) {
      return;
    }
    if (clickedDegreeData.correct) {
      handleCorrect(clickedDegreeData);
      setMeasure(0);
    } else {
      handleIncorrect(clickedDegreeData);
      disableWrongDegreeBtn(clickedDegreeData.name);
    }
  };

  return (
    <div className="gameWrapper">
      <StatusContainer {...{ scoreBoard, displayText }} />
      <div className="userBtns">
        <UserButton handleClick={loadAndPlayTransport} isPlaying={isPlaying}>
          PLAY
        </UserButton>
        <UserButton handleClick={handleChangeKey} isPlaying={isPlaying}>
          KEY CHANGE
        </UserButton>
      </div>
      <div className="musicBlockBoard">
        <Blocks {...{ measure, handleBlockClick, mysteryBlock }} />
      </div>
      <div className="answerBoard">
        <GuessButtons
          data={degreeBtnData}
          {...{ handleGuessClick, isPlaying }}
        />
      </div>
    </div>
  );
};

export default GameContainer;
