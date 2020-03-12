const scaleFormula = { major: [0, 2, 2, 1, 2, 2, 2] };
const chordProgressionFormula = [0, 3, 4, 0];
const chordFormula = [-3, 0, 2, 4, 7];
// prettier-ignore
const chordDegreeFormula = ["R/8", "♭9", "9", "♭10", "10", "11", "o12/TT", "12", "♭6", "6", "♭7", "7"];

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

const diceRoll = n => {
  return Math.floor(Math.random() * n);
};

//Generates 'random' mystery note
const mysteryNoteGen = root => {
  let noteSeed = diceRoll(11);
  let note = tones[root + noteSeed + 36];
  let chordDegree = chordDegreeFormula[noteSeed];

  return {
    note,
    chordDegree
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

const scaleGen = (root, scaleIntervals, tones) => {
  let generatedScale = [];
  //starting at root, tone 'walks' up scale for 6 octaves
  for (let i = 1, tone = root; i < 6; i++) {
    scaleIntervals.forEach(interval => {
      tone += interval;
      generatedScale.push(tones[tone]);
    });
    tone++;
  }
  return generatedScale;
};

const setupChordDegree = (root, chordDegreeFormula) =>
  chordDegreeFormula.map((chordDeg, i) => ({
    name: chordDeg,
    note: tones[root + i + 36]
  }));

const noteData = () => {
  let root = diceRoll(11);
  let scale = scaleGen(root, scaleFormula.major, tones);
  let chords = chordProgressionGen(scale, chordProgressionFormula);
  let mysteryNote = mysteryNoteGen(root);
  let chordProgression = chordProgressionFormula;
  let chordDegreeData = setupChordDegree(root, chordDegreeFormula);
  return {
    scale,
    chords,
    chordProgression,
    mysteryNote,
    chordDegreeData
  };
};

export default noteData;
