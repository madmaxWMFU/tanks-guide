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
})({"js/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRomeNumber = exports.getUrl = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const parameters = {
  //   application_id: process.env.WOT_API_ID_KEY,
  application_id: '42a820be7f4b3fa53490a3eebeae0521'
};

const getStringParams = params => {
  return Object.entries(params).map((param, key) => {
    return `${param.join('=')}&`;
  }).join('');
};

const romeNumber = {
  '1': "I",
  '2': "II",
  '3': "III",
  '4': "IV",
  '5': "V",
  '6': "VI",
  '7': "VII",
  '8': "VIII",
  '9': "IX",
  '10': "X"
};

const getUrl = (path, param = {}) => {
  let params = _objectSpread(_objectSpread({}, parameters), param);

  getStringParams(params);
  return `https://api.worldoftanks.ru/wot/encyclopedia/${path}/?${getStringParams(params)}`;
};

exports.getUrl = getUrl;

const getRomeNumber = num => {
  return romeNumber[num];
};

exports.getRomeNumber = getRomeNumber;
},{}],"js/app.js":[function(require,module,exports) {
"use strict";

var _utils = require("./utils");

if (module.hot) {
  module.hot.accept();
}

window.dataStore = {
  status: {
    error: null,
    process: null
  },
  init: {
    cache: 'generalData',
    path: 'info',
    param: {
      language: 'ru'
    }
  },
  cache: {
    generalData: null,
    searchData: null,
    vehicleData: null
  },
  filters: {},
  vehicle_compare: []
};
window.renderApp = renderApp;
window.loadData = loadData;
window.performSearch = performSearch;
window.searchByFilter = searchByFilter; // window.searchById = searchById;

performSearch(window.dataStore.init.cache, window.dataStore.init.path, window.dataStore.init.param);
renderApp();

function renderApp() {
  document.querySelector('#app-root').innerHTML = `
        ${App()}
    `;
}

function loadData(path, param) {
  const url = (0, _utils.getUrl)(path, param);
  return fetch(url).then(response => response.json()).then(data => data);
}

function performSearch(cache, path, param) {
  window.dataStore.status.process = 'in load';
  window.loadData(path, param).then(({
    error,
    data
  }) => {
    if (error) {
      window.dataStore.status.error = 'error';
    } else if (data) {
      window.dataStore.cache[cache] = data;
    }
  }).catch(() => {
    window.dataStore.status.error = 'Some error occurred.';
  }).finally(window.renderApp);
}

function searchByFilter(vehicle) {
  const cacheType = vehicle.type;
  const [key, value] = vehicle.value.split('-');
  window.dataStore.filters[key] = value;
  window.performSearch(cacheType, 'vehicles', window.dataStore.filters);
} // function searchById(id) {
//   if(id) {
//     const vehicle = window.dataStore.cache.searchData[id];
//     document.querySelector('.modal').classList.add('modal--active');
//     document.querySelector('.modal').innerHTML = `     <div class="modal-body">
//         <div>
//           <button onclick="document.querySelector('.modal').classList.remove('modal--active');"></button>
//         </div>
//         <div class="modal-wrap">
//           <div class="vehicle-item">
//             <span 
//               class="vehicle-type ${
//                 vehicle.is_premium ? `type-${vehicle.type}--premium` : `type-${vehicle.type}`
//               }"
//             >
//               ${getRomeNumber(vehicle.tier)}
//             </span>
//             <span 
//               class="vehicle-flag vehicle-flag-${vehicle.nation}"
//             ></span>
//             <img 
//               class="vehicle-img"
//               src="${vehicle.images.big_icon}"
//               alt="${vehicle.short_name}"
//             > 
//           </div>
//           <div>
//             <p class="vehicle-prop">
//               <b class="vehicle-name">${vehicle.name}</b> - 
//               <b class="vehicle-price">${vehicle.price_credit}</b>
//             </p>
//             <p class="vehicle-prop vehicle-description">${vehicle.description}</p>
//           </div>
//         </div>
//         <p class="vehicle-prop">
//           <span class="vehicle-hp_title">Прочность: </span><b class="vehicle-hp">${vehicle.default_profile.hp}</b>
//         </p>
//         <p class="vehicle-prop">
//           <span class="vehicle-max_ammo_title">Боекомплект: </span><b class="vehicle-max_ammo">${vehicle.default_profile.max_ammo}</b>
//         </p>
//         <p class="vehicle-prop">
//           <span class="vehicle-_title"> :</span><b class="vehicle-">${vehicle.default_profile.max_ammo}</b>
//         </p>
//         <p class="vehicle-prop">
//           <span class="vehicle-speed_forward_title">Максимальная скорость (км/ч) :</span><b class="vehicle-speed_forward">${vehicle.default_profile.speed_forward}</b>
//         </p>
//         <p class="vehicle-prop">
//           <span class="vehicle-speed_backward_title">Макс. скорость заднего хода (км/ч) :</span><b class="vehicle-speed_backward">${vehicle.default_profile.speed_backward}</b>
//         </p>
//         <p class="vehicle-prop">
//           <span class="vehicle-weight_title">Масса (кг):</span><b class="vehicle-weight">${vehicle.default_profile.weight}</b>
//         </p>
//       </div>
//     `;
//   } else {
//     return '';
//   }
// }


function getVehicleList() {
  const data = window.dataStore.cache.searchData;

  if (data) {
    return Object.values(data).map(vehicle => {
      return `
          <div 
            class="vehicle-item"
            data-type="vehicleData"
            data-id="${vehicle.tank_id}"
            onclick=""
          > 
            <span 
              class="vehicle-type ${vehicle.is_premium ? `type-${vehicle.type}--premium` : `type-${vehicle.type}`}"
            >
              ${(0, _utils.getRomeNumber)(vehicle.tier)}
            </span>
            <span 
              class="vehicle-flag vehicle-flag-${vehicle.nation}"
            ></span>
            <img 
              class="vehicle-img"
              src="${vehicle.images.big_icon}"
              alt="${vehicle.short_name}"
            /> 
            <span 
              class="vehicle-title ${vehicle.is_premium ? 'vehicle-title--premium' : ''}"
            >
              ${vehicle.short_name}
            </span>
          </div>`;
    }).join('');
  } else {
    return '';
  }
}

function getVehicleTypes() {
  if (window.dataStore.cache.generalData) {
    const {
      vehicle_types: vehicleTypes
    } = window.dataStore.cache.generalData;
    return `
      <ul class="nation-list">
          ${Object.keys(vehicleTypes).map(type => {
      return `
                <li 
                  class="type-item"
                  data-type="searchData"
                  data-value="type-${type}"
                  onclick="(${window.searchByFilter})(this.dataset);"
                >
                  <img 
                    class="type-img"
                    src="./images/types/${type.toLocaleLowerCase()}.png"
                    alt="${vehicleTypes[type]}">
                  <span>
                    ${vehicleTypes[type]}
                  </span>
                </li>`;
    }).join('')}
      </ul>`;
  } else {
    return '';
  }
}

function getVehicleNations() {
  if (window.dataStore.cache.generalData) {
    const {
      vehicle_nations: nationList
    } = window.dataStore.cache.generalData;
    return `
      <ul class="nation-list">
          ${Object.keys(nationList).map(nation => {
      return `
                <li 
                  class="nation-item"
                  data-type="searchData"
                  data-value="nation-${nation}"
                  onclick="(${window.searchByFilter})(this.dataset);"
                >
                  <img 
                    class="nation-img"
                    src="./images/flags/${nation}.png"
                    alt="${nationList[nation]}"
                  >
                  <span>
                    ${nationList[nation]}
                  </span>
                </li>`;
    }).join('')}
      </ul>`;
  } else {
    return '';
  }
}

function App() {
  return `
    <div class="nation-wrap">
        <h2 class="nation-title">Нация</h2>
        ${getVehicleNations()}
    </div>
    <div class="type-wrap">
        <h2 class="type-title">Вид</h2>
        ${getVehicleTypes()}
    </div>
    <div class="vehicle-wrap">
    </div>
    <div class="infoVehicle-wrap modal ">
    </div>
    `;
} // ${getVehicleList()}
},{"./utils":"js/utils.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60758" + '/');

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
      } else {
        window.location.reload();
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map