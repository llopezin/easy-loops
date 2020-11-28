import { qsa } from "../helpers/helpers.js";

export default function getTemplate() {
  let beats = qsa(".beat.play");

  let template = {};

  beats.forEach((beat) => {
    let beatNum = beat.dataset.beat;
    let beatUrl = beat.parentElement.dataset.url;
    if (!template[beatNum]) {
      template[beatNum] = [];
    }

    template[beatNum].push(beatUrl);
  });

  return template;
}
