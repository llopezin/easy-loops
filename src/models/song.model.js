import Sound from "./sound.model.js";

export default class Song {
  constructor(template) {
    for (const key in template) {
      this[key] = template[key].map((url) => {
        return new Sound(url);
      });
    }
  }

  playBeat(beat) {
    if (this[beat] === undefined) return;
    this[beat].forEach((sound) => {
      sound.stop();
      sound.play();
    });
  }
}
