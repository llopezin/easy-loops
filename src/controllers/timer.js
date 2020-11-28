import addColorToColumn from "../view/visuals.js";
import getBeat from "./get-beat.js";
import Beat from "../models/beat.model.js";

let state = {
  interval: "",
  beat: 1,
  running: false,
  sound: new Beat(getBeat(1)),
};

export default function timer(action) {
  switch (action) {
    case "stop":
      stop();
      break;
    case "pause":
      pause();
      break;
    case "run":
      runInterval();
      break;
    case "toggle":
      state.running ? pause() : runInterval();
  }
}

function pause() {
  clearInterval(state.interval);
  state.running = false;
}

function stop() {
  state.beat = 1;
  addColorToColumn(1);
  clearInterval(state.interval);
  state.running = false;
  return;
}

function runInterval() {
  if (state.running === true) return;
  state.interval = setInterval(() => {
    let beat = new Beat(getBeat(state.beat));
    addColorToColumn(state.beat);
    beat.play();
    updateCounter();
  }, 200);
  state.running = true;
}

function updateCounter() {
  if (state.beat === 16) state.beat = 0;
  state.beat++;
}
