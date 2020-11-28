function toArray(list) {
  return [].slice.call(list);
}

function qsa(query) {
  return toArray(document.querySelectorAll(query));
}

function qs(query) {
  return document.querySelector(query);
}

function store(key, item) {
  localStorage.setItem(key, item);
}

export { toArray, qsa, qs, store };
