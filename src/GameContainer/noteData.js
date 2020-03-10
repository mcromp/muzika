//Generates the data of a 6 octave musical 'keyboard' readable  by Tone.js
const toneGen = () => {
  //prettier-ignore
  let musicalNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  let octaves = [1, 2, 3, 4, 5, 6, 7];
  let tones = [];

  octaves.forEach(octave =>
    musicalNotes.forEach(note => tones.push(`${note}${octave}`))
  );

  return tones;
};

let tones = toneGen();

//Generates 'random' mystery note
const randNoteGen = root => {
  let rN = diceRoll(11);
  let randNote = tones[root + rN + 36];
  let rNoteDegree = chordDegreeFormula[rN];

  return {
    randNote,
    rNoteDegree
  };
};

const chordProgressionGen = (rtScale, chdProgForm) =>
  chdProgForm.map(chordRoot => chordGen(chordRoot, rtScale));

//Generates a chord with random voicing, for a variety of voice leadings
const chordGen = (root, rtScale) => {
  let chordInv = diceRoll(3);
  let chord = [];
  for (let i = 0; i <= 2; i++) {
    chord.push(chordFormula[chordInv + i] + root);
  }
  return chord.map(note => rtScale[note + 14]);
};

const scaleGen = (root, s, tones) => {
  let generatedScale = [];
  for (let i = 1, x = root; i < 6; i++) {
    s.map(scalenote => {
      let tempScaleArr = generatedScale.push(tones[scalenote + x]);
      x += scalenote;
      return tempScaleArr;
    });
    x = root + i * 12;
  }
  return generatedScale;
};

const setupChordDegree = (root, chordDegreeFormula) => {
  return chordDegreeFormula.map((chordDeg, i) => {
    return {
      degree: chordDeg,
      degreeNote: tones[root + i + 36]
    };
  });
};

export const noteData = () => {
  let root = diceRoll(11);
  let scale = scaleGen(root, scaleFormula.major, tones);
  let chords = chordProgressionGen(scale, chordProgressionFormula);
  let randNote = randNoteGen(root);
  let chordProgression = chordProgressionFormula;
  let chordDeg = setupChordDegree(root, chordDegreeFormula);
  return {
    root: tones[root],
    scale,
    chords,
    chordProgression,
    randNote,
    chordDeg
  };
};

const diceRoll = n => {
  return Math.floor(Math.random() * n);
};

const scaleFormula = { major: [0, 2, 2, 1, 2, 2, 2] };

const chordProgressionFormula = [0, 3, 4, 0];

const chordFormula = [-3, 0, 2, 4, 7];

// prettier-ignore
const chordDegreeFormula = ["R/8", "♭9", "9", "♭10", "10", "11", "o12/TT", "12", "♭6", "6", "♭7", "7"];
