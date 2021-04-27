parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"8MgT":[function(require,module,exports) {
"use strict";function e(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function t(t){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?e(Object(o),!0).forEach(function(e){r(t,e,o[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))})}return t}function r(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getUrl=void 0;const n={application_id:'42a820be7f4b3fa53490a3eebeae0521"'},o=e=>Object.entries(e).map((e,t)=>`${e.join("=")}&`).join(""),c=(e,r={})=>{let c=t(t({},n),r);return o(c),`https://api.worldoftanks.ru/wot/encyclopedia/${e}/?${o(c)}`};exports.getUrl=c;
},{}],"QdeU":[function(require,module,exports) {
"use strict";var n=require("./utils");function e(){document.querySelector("#app-root").innerHTML=`\n        ${d()}\n    `}function a(e,a){const t=(0,n.getUrl)(e,a);return fetch(t).then(n=>n.json()).then(n=>n)}function t(n,e,a){window.loadData(e,a).then(({error:e,data:a})=>{e?console.error("error"):a&&(window.dataStore.cache[n]=a)}).catch(()=>{console.log("Some error occurred.")}).finally(window.renderApp)}function i(n){const e=n.type,[a,t]=n.value.split("-");window.dataStore.filters[a]=t,window.performSearch(e,"vehicles",window.dataStore.filters)}function o(n){const e=n.type,[a,t]=n.value.split("-");window.dataStore.filters[a]=t,window.performSearch(e,"vehicleprofile",window.dataStore.filters)}function c(){const n=window.dataStore.cache.vehicleData,e=window.dataStore.cache.searchData;if(n){console.log(n),console.log(Object.values(n));const a=Object.values(n)[0].tank_id;return console.log(a),console.log(e),`\n      <div> \n        <p>${e[a].description}</p>\n        <p>Weight: <b>${Object.values(n)[0].weight}</b></p>\n      </div>\n    `}return""}function l(){const n=window.dataStore.cache.searchData;return n?Object.values(n).map(n=>`\n          <div \n            class="vehicle-item" \n            data-type='vehicleData'\n            data-value="tank_id-${n.tank_id}" \n            onclick="(${o})(this.dataset)"\n          > \n            <span \n              class="vehicle-type ${n.is_premium?`type-${n.type}--premium`:`type-${n.type}`}"\n            >\n              ${n.tier}\n            </span>\n            <span \n              class="vehicle-flag vehicle-flag-${n.nation}"\n            ></span>\n            <img \n              class="vehicle-img" \n              src="${n.images.big_icon}" \n              alt="${n.short_name}"\n            > \n            <span \n              class="vehicle-title ${n.is_premium?"vehicle-title--premium":""}"\n            >\n              ${n.short_name}\n            </span>\n          </div>`).join(""):""}function r(){const{vehicle_types:n}=window.dataStore.cache.generalData;return`\n    <ul class='nation-list'>\n        ${Object.keys(n).map(e=>`\n              <li \n                class='type-item' \n                data-type="searchData"\n                data-value="type-${e}" \n                onclick="(${window.searchByFilter})(this.dataset);"\n              >\n                <img \n                  class='type-img' \n                  src='./images/types/${e.toLocaleLowerCase()}.png' \n                  alt='${n[e]}'>\n                <span>\n                  ${n[e]}\n                </span>\n              </li>`).join("")}\n    </ul>`}function s(){const{vehicle_nations:n}=window.dataStore.cache.generalData;return`\n    <ul class='nation-list'>\n        ${Object.keys(n).map(e=>`\n              <li \n                class='nation-item' \n                data-type="searchData"\n                data-value="nation-${e}" \n                onclick="(${window.searchByFilter})(this.dataset);"\n              >\n                <img \n                  class='nation-img' \n                  src='./images/flags/${e}.png' \n                  alt='${n[e]}'\n                >\n                <span>\n                  ${n[e]}\n                </span>\n              </li>`).join("")}\n    </ul>`}function d(){return`\n    <div class="nation-wrap">\n        ${s()}\n    </div>\n    <div class="type-wrap">\n        ${r()}\n    </div>\n    <div class="vehicle-wrap">\n        ${l()}\n    </div>\n    <div class="infoVehicle-wrap">\n        ${c()}\n    </div>\n  `}module.hot&&module.hot.accept(),window.dataStore={init:{cache:"generalData",path:"info",param:{language:"ru"}},cache:{generalData:null,searchData:null,vehicleData:null},filters:{},vehicle_compare:[]},window.renderApp=e,window.loadData=a,window.performSearch=t,window.searchByFilter=i,t(window.dataStore.init.cache,window.dataStore.init.path,window.dataStore.init.param),e();
},{"./utils":"8MgT"}]},{},["QdeU"], null)
//# sourceMappingURL=app.ae883569.js.map