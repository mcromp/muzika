import Tone from "tone";

const padSynth = new Tone.PolySynth(3, Tone.FMSynth, {
  harmonicity: 3.01,
  modulationIndex: 14,
  oscillator: {
    type: "triangle"
  },
  envelope: {
    attack: 0.2,
    decay: 0.3,
    sustain: 0.1,
    release: 1.2
  },
  modulation: {
    type: "square"
  },
  modulationEnvelope: {
    attack: 0.01,
    decay: 0.5,
    sustain: 0.2,
    release: 0.1
  }
}).toMaster();
const bassSynth = new Tone.MonoSynth({
  oscillator: {
    type: "fmsquare5",
    modulationType: "triangle",
    modulationIndex: 2,
    harmonicity: 0.501
  },
  filter: {
    Q: 1,
    type: "lowpass",
    rolloff: -24
  },
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.2,
    release: 2
  },
  volume: -10,
  filterEnvelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.8,
    release: 1.5,
    baseFrequency: 50,
    octaves: 4.4
  }
}).toMaster();
const guessSynth = new Tone.MonoSynth({
  oscillator: {
    type: "square"
  },
  filter: {
    Q: 2,
    type: "lowpass",
    rolloff: -12
  },
  envelope: {
    attack: 0.005,
    decay: 3,
    sustain: 0,
    release: 0.45
  },
  filterEnvelope: {
    attack: 0.001,
    decay: 0.32,
    sustain: 0.9,
    release: 3,
    baseFrequency: 700,
    octaves: 2.3
  }
}).toMaster();
const playbackSynth = new Tone.PolySynth(3, Tone.Synth, {
  oscillator: {
    type: "sawtooth"
  },
  volume: -16,
  filter: {
    Q: 1,
    type: "lowpass",
    rolloff: -12
  },
  envelope: {
    attack: 0.1,
    decay: 0.1,
    sustain: 0.9,
    release: 0.3
  }
}).toMaster();

export const loadChords = padData => {
  let noteLength = "2n";
  Tone.Transport.scheduleOnce(time => {
    guessSynth.triggerAttackRelease(
      padData.randNote.randNote,
      noteLength,
      time
    );
  }, "5:0");

  padData.chords.map((chord, i) =>
    Tone.Transport.scheduleOnce(time => {
      padSynth.triggerAttackRelease(chord, noteLength, time);
    }, `${i}:0`)
  );
  padData.chordProgression.map((degree, i) =>
    Tone.Transport.scheduleOnce(time => {
      bassSynth.triggerAttackRelease(
        padData.scale[degree + 7],
        noteLength,
        time
      );
    }, `${i}:0`)
  );
};

export const createLoop = (
  setMeasure,
  setPlaying,
  correctRef,
  setCorrectRef,
  playAfterCorrect
) => {
  let loop = new Tone.Sequence(
    (time, beat) => {
      Tone.Draw.schedule(() => {
        setMeasure(beat);
        if (beat === 0) {
          setPlaying(true);
        }
        if (beat === 7) {
          setMeasure("off");
          loop.dispose();
          if (correctRef.current) {
            console.log("correct Ref play");
            playAfterCorrect();
          } else {
            setPlaying(false);
          }
        }
      }, time);
    },
    [0, 1, 2, 3, 4, 5, 6, 7, "off"],
    "1m"
  );
  loop.start(0).stop("8m");
};

export const loadSingleChord = chord => {
  Tone.Transport.scheduleOnce(time => {
    playbackSynth.triggerAttackRelease(chord, "2n", time);
  }, "0:0");
};

export const createSingleLoop = setMeasure => {
  let singleLoop = new Tone.Sequence(
    (time, beat) => {
      if (beat === 1) {
        setMeasure("off");
        singleLoop.dispose();
      }
    },
    [0, 1],
    "1m"
  );
  singleLoop.start(0).stop("2m");
};
