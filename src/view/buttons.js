import timer from "../controllers/timer.js";
import { qs, qsa } from "../helpers/helpers.js";
import addKeyboardControl from "../controllers/keyboard-controllers.js";
import addEventsToInstrumentButtons from "./instrument-buttons.js";

export default function addControllerEvents() {
  addEvent("stop", stopTimer);
  addEvent("play", startTimer);
  addEvent("clear", clearPads);
  addKeyboardControl();
  addEventsToInstrumentButtons();
}

function stopTimer() {
  timer("stop");
}

function startTimer() {
  timer("run");
}

function clearPads() {
  stopTimer();
  qsa(".play").forEach((pad) => {
    pad.classList.remove("play");
  });
}

function addEvent(btnName, cb) {
  let btn = qs(`.${btnName}Btn`);
  btn.addEventListener("click", () => {
    cb();
  });
}
