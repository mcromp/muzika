import React, { useState, useCallback, useEffect, useRef } from "react";
import "../App.css";
import Tone from "tone";
import { noteData } from "./noteData";
import Blocks from "./Blocks";
import GuessButtons from "./GuessButtonsContainer";
import StatusContainer from "./StatusContainer";
// prettier-ignore
import { createLoop, createSingleLoop, loadChords, loadSingleChord } from "./loadMusicLoopData";

const GameContainer = () => {
  // prettier-ignore
  const [scoreBoard, setScoreBoard] = useState({correct: 0, total: 0, percent: "", avgAttempts: 0});
  const [degreeBtnData, setDegreeBtnData] = useState([]);
  const [measure, setMeasure] = useState("off");
  const [playing, setPlaying] = useState(true);
  const [questionBlock, setQuestionBlock] = useState("???");
  const [displayText, setDisplayText] = useState(
    "Game Initiated: Click 'PLAY' hear the musical progression. Then guess a degree"
  );
  const musicData = useRef({});
  const correctRef = useRef(false);

  Tone.Transport.timeSignature = [3, 4];
  Tone.Transport.bpm.value = 400;

  //useCallback invoked to prevent infinite looping from intial useEffect
  const newKey = useCallback(() => {
    let data = noteData();
    setMusicRef(data);
    setupGuessButtons(
      data.chordDeg,
      data.randNote.rNoteDegree,
      setDegreeBtnData
    );
  }, []);

  //useEffect to initialize game
  useEffect(() => {
    newKey();
    setTimeout(() => {
      setPlaying(false);
    }, 900);
  }, [newKey]);

  const setMusicRef = data => {
    musicData.current = data;
  };

  const setCorrectRef = data => {
    correctRef.current = data;
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

  const setupGuessButtons = (data, answer, setDegreeBtnData) => {
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

  const handleCorrect = () => {
    setDisplayText("Correct!");
    setCorrectRef(true);
    start();
    play();
    setQuestionBlock(musicData.current.randNote.rNoteDegree);
    setupScoreBoard(1);
    newKey();
  };

  const playAfterCorrect = () => {
    setDisplayText("New Key, Guess a degree");
    setQuestionBlock("???");
    setCorrectRef(false);
    start();
    play();
  };

  const handleIncorrect = data => {
    setDisplayText(`${data.name} is incorrect`);
    setupScoreBoard(0);
    loadSingleChord(data.note);
    play();
  };

  const handleChangeKey = () => {
    setDisplayText("Key Changed");
    newKey();
    start();
    play();
  };

  const start = () => {
    Tone.Transport.cancel();
    setMeasure(0);
    createLoop(
      setMeasure,
      setPlaying,
      correctRef,
      setCorrectRef,
      playAfterCorrect
    );
    loadChords(musicData.current);
  };

  const play = (time = "+0.2") => {
    Tone.Transport.stop();
    Tone.Transport.start(time);
  };

  const handleBlockClick = number => {
    if (!playing) {
      Tone.Transport.cancel();
      setMeasure(number);
      let chord = [];
      number !== 5
        ? (chord = musicData.current.chords[number])
        : (chord = [musicData.current.randNote.randNote]);
      createSingleLoop(setMeasure);
      loadSingleChord(chord);
      play();
    }
  };

  const handleGuessClick = (data, playing) => {
    if (!playing) {
      if (data.correct) {
        handleCorrect(data);
        setMeasure(0);
      } else {
        handleIncorrect(data);
        setDegreeBtnData(prevState => {
          let updatedState = [...prevState];
          updatedState.map(deg => {
            if (deg.name === data.name) {
              deg.disabled = true;
            }
            return deg;
          });
          return updatedState;
        });
      }
    }
  };

  return (
    <div className="gameWrapper">
      <StatusContainer scoreBoard={scoreBoard} displayText={displayText} />
      <div className="userBtns">
        <UserButton
          handleClick={() => {
            start();
            play();
          }}
          playing={playing}
        >
          PLAY
        </UserButton>
        <UserButton handleClick={handleChangeKey} playing={playing}>
          KEY CHANGE
        </UserButton>
      </div>
      <div className="musicBlockBoard">
        <Blocks {...{ measure, handleBlockClick, questionBlock }} />
      </div>
      <div className="answerBoard">
        <GuessButtons
          data={degreeBtnData}
          handleGuessClick={handleGuessClick}
          playing={playing}
        />
      </div>
    </div>
  );
};

export default GameContainer;

const UserButton = ({ children, handleClick, playing }) => (
  <button disabled={playing} onClick={handleClick}>
    {children}
  </button>
);
