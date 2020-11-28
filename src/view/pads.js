import { toArray } from "../helpers/helpers.js";

export default function addEventToKeys() {
  addClassOnClick();
}

function addClassOnClick() {
  let keys = toArray(document.querySelectorAll("td"));

  keys.forEach((key) => {
    key.addEventListener("click", () => {
      key.classList.toggle("play");
    });
  });
}
