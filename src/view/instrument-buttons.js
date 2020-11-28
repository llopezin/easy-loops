import { qsa } from "../helpers/helpers.js";
import getTemplate from "../controllers/get-template.js";
import Song from "../models/song.model.js";
import { store } from "../helpers/helpers.js";

export default function addEventsToInstrumentButtons() {
  let instrumentButtons = qsa(".instrument-group");

  instrumentButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("click");
      store("template", storeTemplate());
    });
  });
}

function storeTemplate() {
  let song = getTemplate();
  console.log(new Song(getTemplate()));
  console.log(JSON.stringify(song));
  return JSON.stringify(song);
}
