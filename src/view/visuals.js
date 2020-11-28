import { qsa } from "../helpers/helpers.js";

export default function addColorToColumn(num) {
  removePreviousColor();
  let pads = qsa(".beat").filter((pad) => {
    return pad.dataset.beat === `${num}`;
  });
  pads.forEach((pad) => pad.classList.add("current"));
}

function removePreviousColor() {
  let current = qsa(".current");
  current.forEach((current) => current.classList.remove("current"));
}
