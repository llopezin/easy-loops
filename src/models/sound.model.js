export default class Sound {
  constructor(src) {
    this.sound = new Audio(`/assets/sound-files/${src}`);
  }

  play() {
    this.sound.play();
  }
  stop() {
    this.sound.pause();
  }
}
