import React from "react";

const HowToPlay = () => (
  <div className="textContainer">
    <h3>What is MuziKa?</h3>
    <p>
      MuziKa! is an ear-training program designed to help improve the player's
      harmonic comprehension.
    </p>
    <h3>Objective</h3>
    <p>
      The objective is to identify the mysterious tone (marked as '???'). Listen
      to the chord progression and try to determine how the final tone is
      harmonically related to the root chord (tonic).
    </p>
    <h3>How to Play</h3>
    <p>
      Press the 'PLAY' button and a I-IV-V-I chord progression will sound
      followed by a single tone. At the bottom of the game board are 12 buttons
      representing the 12 possible chord degrees. The player must identify the
      correct chord degree of the 'mystery tone' (marked as '???') in relation
      to the progression's musical key. Play the chord progression as many times
      as necessary to internalize the scale of the key in relation to the
      mystery tone. To hear a single instance of any of the chords or the
      mystery tone click on its corresponding box. For a new key and mystery
      tone, select 'KEY CHANGE'. At the top right of the game board is an
      average of attempts followed by a percentage of correct.
    </p>
  </div>
);

export default HowToPlay;
