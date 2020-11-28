// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"helpers/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toArray = toArray;
exports.qsa = qsa;
exports.qs = qs;
exports.store = store;

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
},{}],"view/visuals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addColorToColumn;

var _helpers = require("../helpers/helpers.js");

function addColorToColumn(num) {
  removePreviousColor();
  var pads = (0, _helpers.qsa)(".beat").filter(function (pad) {
    return pad.dataset.beat === "".concat(num);
  });
  pads.forEach(function (pad) {
    return pad.classList.add("current");
  });
}

function removePreviousColor() {
  var current = (0, _helpers.qsa)(".current");
  current.forEach(function (current) {
    return current.classList.remove("current");
  });
}
},{"../helpers/helpers.js":"helpers/helpers.js"}],"controllers/get-beat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBeat;

var _helpers = require("../helpers/helpers.js");

function getBeat(num) {
  var pads = (0, _helpers.qsa)("td[data-beat = '".concat(num, "'].play"));
  var urls = pads.map(function (pad) {
    return pad.parentElement.dataset.url;
  });
  return urls;
}
},{"../helpers/helpers.js":"helpers/helpers.js"}],"models/sound.model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sound = /*#__PURE__*/function () {
  function Sound(src) {
    _classCallCheck(this, Sound);

    this.sound = new Audio("/assets/sound-files/".concat(src));
  }

  _createClass(Sound, [{
    key: "play",
    value: function play() {
      this.sound.play();
    }
  }, {
    key: "stop",
    value: function stop() {
      this.sound.pause();
    }
  }]);

  return Sound;
}();

exports.default = Sound;
},{}],"models/beat.model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _soundModel = _interopRequireDefault(require("./sound.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Beat = /*#__PURE__*/function () {
  function Beat(urls) {
    _classCallCheck(this, Beat);

    this.sounds = urls.map(function (url) {
      return new _soundModel.default(url);
    });
  }

  _createClass(Beat, [{
    key: "play",
    value: function play() {
      if (this.sounds.length === 0) return;
      this.sounds.forEach(function (sound) {
        sound.stop();
        sound.play();
      });
    }
  }]);

  return Beat;
}();

exports.default = Beat;
},{"./sound.model.js":"models/sound.model.js"}],"controllers/timer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = timer;

var _visuals = _interopRequireDefault(require("../view/visuals.js"));

var _getBeat = _interopRequireDefault(require("./get-beat.js"));

var _beatModel = _interopRequireDefault(require("../models/beat.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
  interval: "",
  beat: 1,
  running: false,
  sound: new _beatModel.default((0, _getBeat.default)(1))
};

function timer(action) {
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
  (0, _visuals.default)(1);
  clearInterval(state.interval);
  state.running = false;
  return;
}

function runInterval() {
  if (state.running === true) return;
  state.interval = setInterval(function () {
    var beat = new _beatModel.default((0, _getBeat.default)(state.beat));
    (0, _visuals.default)(state.beat);
    beat.play();
    updateCounter();
  }, 200);
  state.running = true;
}

function updateCounter() {
  if (state.beat === 16) state.beat = 0;
  state.beat++;
}
},{"../view/visuals.js":"view/visuals.js","./get-beat.js":"controllers/get-beat.js","../models/beat.model.js":"models/beat.model.js"}],"controllers/keyboard-controllers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addKeyboardControl;

var _timer = _interopRequireDefault(require("./timer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addKeyboardControl() {
  window.addEventListener("keypress", function (event) {
    if (event.code === "Space") {
      document.activeElement.blur();
      console.log("space bar pressed");
      (0, _timer.default)("toggle");
    }
  });
}
},{"./timer.js":"controllers/timer.js"}],"controllers/get-template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTemplate;

var _helpers = require("../helpers/helpers.js");

function getTemplate() {
  var beats = (0, _helpers.qsa)(".beat.play");
  var template = {};
  beats.forEach(function (beat) {
    var beatNum = beat.dataset.beat;
    var beatUrl = beat.parentElement.dataset.url;

    if (!template[beatNum]) {
      template[beatNum] = [];
    }

    template[beatNum].push(beatUrl);
  });
  return template;
}
},{"../helpers/helpers.js":"helpers/helpers.js"}],"models/song.model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _soundModel = _interopRequireDefault(require("./sound.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Song = /*#__PURE__*/function () {
  function Song(template) {
    _classCallCheck(this, Song);

    for (var key in template) {
      this[key] = template[key].map(function (url) {
        return new _soundModel.default(url);
      });
    }
  }

  _createClass(Song, [{
    key: "playBeat",
    value: function playBeat(beat) {
      if (this[beat] === undefined) return;
      this[beat].forEach(function (sound) {
        sound.stop();
        sound.play();
      });
    }
  }]);

  return Song;
}();

exports.default = Song;
},{"./sound.model.js":"models/sound.model.js"}],"view/instrument-buttons.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addEventsToInstrumentButtons;

var _helpers = require("../helpers/helpers.js");

var _getTemplate = _interopRequireDefault(require("../controllers/get-template.js"));

var _songModel = _interopRequireDefault(require("../models/song.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addEventsToInstrumentButtons() {
  var instrumentButtons = (0, _helpers.qsa)(".instrument-group");
  instrumentButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      console.log("click");
      (0, _helpers.store)("template", storeTemplate());
    });
  });
}

function storeTemplate() {
  var song = (0, _getTemplate.default)();
  console.log(new _songModel.default((0, _getTemplate.default)()));
  console.log(JSON.stringify(song));
  return JSON.stringify(song);
}
},{"../helpers/helpers.js":"helpers/helpers.js","../controllers/get-template.js":"controllers/get-template.js","../models/song.model.js":"models/song.model.js"}],"view/buttons.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addControllerEvents;

var _timer = _interopRequireDefault(require("../controllers/timer.js"));

var _helpers = require("../helpers/helpers.js");

var _keyboardControllers = _interopRequireDefault(require("../controllers/keyboard-controllers.js"));

var _instrumentButtons = _interopRequireDefault(require("./instrument-buttons.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addControllerEvents() {
  addEvent("stop", stopTimer);
  addEvent("play", startTimer);
  addEvent("clear", clearPads);
  (0, _keyboardControllers.default)();
  (0, _instrumentButtons.default)();
}

function stopTimer() {
  (0, _timer.default)("stop");
}

function startTimer() {
  (0, _timer.default)("run");
}

function clearPads() {
  stopTimer();
  (0, _helpers.qsa)(".play").forEach(function (pad) {
    pad.classList.remove("play");
  });
}

function addEvent(btnName, cb) {
  var btn = (0, _helpers.qs)(".".concat(btnName, "Btn"));
  btn.addEventListener("click", function () {
    cb();
  });
}
},{"../controllers/timer.js":"controllers/timer.js","../helpers/helpers.js":"helpers/helpers.js","../controllers/keyboard-controllers.js":"controllers/keyboard-controllers.js","./instrument-buttons.js":"view/instrument-buttons.js"}],"view/pads.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addEventToKeys;

var _helpers = require("../helpers/helpers.js");

function addEventToKeys() {
  addClassOnClick();
}

function addClassOnClick() {
  var keys = (0, _helpers.toArray)(document.querySelectorAll("td"));
  keys.forEach(function (key) {
    key.addEventListener("click", function () {
      key.classList.toggle("play");
    });
  });
}
},{"../helpers/helpers.js":"helpers/helpers.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _buttons = _interopRequireDefault(require("./view/buttons.js"));

var _pads = _interopRequireDefault(require("./view/pads.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init() {
  (0, _buttons.default)();
  (0, _pads.default)();
}

init();
},{"./view/buttons.js":"view/buttons.js","./view/pads.js":"view/pads.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59769" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map