import { qsa } from "../helpers/helpers.js";

export default function getBeat(num) {
  let pads = qsa(`td[data-beat = '${num}'].play`);

  let urls = pads.map((pad) => {
    return pad.parentElement.dataset.url;
  });

  return urls;
}
