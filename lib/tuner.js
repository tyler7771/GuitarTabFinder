const NOTE = require("./note");

const TONES = {
  'E': 82.41,
  'A': 110.00,
  'D': 146.83,
  'G': 196.00,
  'B': 246.94,
  'e': 329.63,
};

class Tuner {
  constructor() {
    this.note = "";
    this.bindEvents();
  }

  bindEvents() {
    let tuner = document.getElementById("tuner");
    tuner.addEventListener("change", () => {
      this.note = tuner.value;
    });

    let tunerButton = document.getElementById("tune-button");
    tunerButton.addEventListener("click", () => {
      this.playNote();
    });
  }

  playNote() {
    const note = new NOTE(TONES[this.note]);
    note.start();
    setTimeout(note.stop.bind(note), 3000);
  }
}


module.exports = Tuner;
