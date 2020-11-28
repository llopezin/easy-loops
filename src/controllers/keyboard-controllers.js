import timer from "./timer.js";

export default function addKeyboardControl() {
  window.addEventListener("keypress", (event) => {
    if (event.code === "Space") {
      document.activeElement.blur();
      console.log("space bar pressed");
      timer("toggle");
    }
  });
}
