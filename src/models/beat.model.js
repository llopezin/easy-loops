import Sound from "./sound.model.js";

export default class Beat {
  constructor(urls) {
    this.sounds = urls.map((url) => {
      return new Sound(url);
    });
  }

  play() {
    if (this.sounds.length === 0) return;
    this.sounds.forEach((sound) => {
      sound.stop();
      sound.play();
    });
  }
}
