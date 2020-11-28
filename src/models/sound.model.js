export default class Sound {
  constructor(src) {
    this.sound = new Audio(`src/assets/sound-files/${src}`);
  }

  play() {
    this.sound.play();
  }
  stop() {
    this.sound.pause();
  }
}
