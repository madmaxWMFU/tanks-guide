parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"8MgT":[function(require,module,exports) {
"use strict";function e(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,o)}return r}function t(t){for(var o=1;o<arguments.length;o++){var n=null!=arguments[o]?arguments[o]:{};o%2?e(Object(n),!0).forEach(function(e){r(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):e(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function r(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getRomeNumber=exports.getUrl=void 0;const o={application_id:"42a820be7f4b3fa53490a3eebeae0521"},n=e=>Object.entries(e).map((e,t)=>`${e.join("=")}&`).join(""),c={1:"I",2:"II",3:"III",4:"IV",5:"V",6:"VI",7:"VII",8:"VIII",9:"IX",10:"X"},i=(e,r={})=>{let c=t(t({},o),r);return n(c),`https://api.worldoftanks.ru/wot/encyclopedia/${e}/?${n(c)}`};exports.getUrl=i;const p=e=>c[e];exports.getRomeNumber=p;
},{}],"QdeU":[function(require,module,exports) {
"use strict";var n=require("./utils");function a(){document.querySelector("#app-root").innerHTML=`\n        ${s()}\n    `}function t(a,t){const e=(0,n.getUrl)(a,t);return fetch(e).then(n=>n.json()).then(n=>n)}function e(n,a,t){window.dataStore.status.process="in load",window.loadData(a,t).then(({error:a,data:t})=>{a?window.dataStore.status.error="error":t&&(window.dataStore.cache[n]=t)}).catch(()=>{window.dataStore.status.error="Some error occurred."}).finally(window.renderApp)}function i(n){const a=n.type,[t,e]=n.value.split("-");window.dataStore.filters[t]=e,window.performSearch(a,"vehicles",window.dataStore.filters)}function r(){const n=window.dataStore.cache.searchData;return n?Object.values(n).map(n=>`\n          <div \n            class="vehicle-item"\n            data-type="vehicleData"\n            data-id="${n.tank_id}"\n            onclick=""\n          > \n\n          </div>`).join(""):""}function o(){if(window.dataStore.cache.generalData){const{vehicle_types:n}=window.dataStore.cache.generalData;return`\n      <ul class="nation-list">\n          ${Object.keys(n).map(a=>`\n                <li \n                  class="type-item"\n                  data-type="searchData"\n                  data-value="type-${a}"\n                  onclick="(${window.searchByFilter})(this.dataset);"\n                >\n                  <img \n                    class="type-img"\n                    src="./images/types/${a.toLocaleLowerCase()}.png"\n                    alt="${n[a]}">\n                  <span>\n                    ${n[a]}\n                  </span>\n                </li>`).join("")}\n      </ul>`}return""}function c(){if(window.dataStore.cache.generalData){const{vehicle_nations:n}=window.dataStore.cache.generalData;return`\n      <ul class="nation-list">\n          ${Object.keys(n).map(a=>`\n                <li \n                  class="nation-item"\n                  data-type="searchData"\n                  data-value="nation-${a}"\n                  onclick="(${window.searchByFilter})(this.dataset);"\n                >\n                  <img \n                    class="nation-img"\n                    src="./images/flags/${a}.png"\n                    alt="${n[a]}"\n                  >\n                  <span>\n                    ${n[a]}\n                  </span>\n                </li>`).join("")}\n      </ul>`}return""}function s(){return`\n    <div class="nation-wrap">\n        <h2 class="nation-title">Нация</h2>\n        ${c()}\n    </div>\n    <div class="type-wrap">\n        <h2 class="type-title">Вид</h2>\n        ${o()}\n    </div>\n    <div class="vehicle-wrap">\n    </div>\n    <div class="infoVehicle-wrap modal ">\n    </div>\n    `}module.hot&&module.hot.accept(),window.dataStore={status:{error:null,process:null},init:{cache:"generalData",path:"info",param:{language:"ru"}},cache:{generalData:null,searchData:null,vehicleData:null},filters:{},vehicle_compare:[]},window.renderApp=a,window.loadData=t,window.performSearch=e,window.searchByFilter=i,e(window.dataStore.init.cache,window.dataStore.init.path,window.dataStore.init.param),a();
},{"./utils":"8MgT"}]},{},["QdeU"], null)
//# sourceMappingURL=app.e2ff3f84.js.map