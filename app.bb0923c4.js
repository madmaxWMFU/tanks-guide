parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"8MgT":[function(require,module,exports) {
"use strict";function e(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function t(t){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?e(Object(o),!0).forEach(function(e){r(t,e,o[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))})}return t}function r(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getRomeNumber=exports.getUrl=exports.getFilterList=void 0;const n={application_id:"42a820be7f4b3fa53490a3eebeae0521"},o=e=>Object.entries(e).map((e,t)=>`${e.join("=")}&`).join(""),i={1:"I",2:"II",3:"III",4:"IV",5:"V",6:"VI",7:"VII",8:"VIII",9:"IX",10:"X"},c=(e,t)=>e.tier-t.tier,a=(e,t)=>Object.values(e).filter(e=>e.type==t),s=e=>Object.values(e).sort((e,t)=>c(e,t)),p=e=>({lightTank:s(a(e,"lightTank")),mediumTank:s(a(e,"mediumTank")),heavyTank:s(a(e,"heavyTank")),"AT-SPG":s(a(e,"AT-SPG")),SPG:s(a(e,"SPG"))});exports.getFilterList=p;const b=(e,r={})=>{let i=t(t({},n),r);return o(i),`https://api.worldoftanks.ru/wot/encyclopedia/${e}/?${o(i)}`};exports.getUrl=b;const l=e=>i[e];exports.getRomeNumber=l;
},{}],"tIaq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.lang=void 0;const e={ru:{},en:{},fr:{},de:{},ch:{}};exports.lang=e;
},{}],"QdeU":[function(require,module,exports) {
"use strict";var e=require("./utils"),n=require("./lang");function a(){document.querySelector("#app-root").innerHTML=`\n      ${o()}\n  `}async function i(n,a){const i=(0,e.getUrl)(n,a),l=await fetch(i);return await l.json()}function l(e,n,a){window.dataStore.status.process="in load",window.loadData(n,a).then(({error:n,data:a})=>{n?window.dataStore.status.error="error":a&&(window.dataStore.cache[e]=a)}).catch(()=>{window.dataStore.status.error="Some error occurred."}).finally(window.renderApp)}function s(e){const n=e.dataset.type,[a,i]=e.dataset.value.split("_");window.dataStore.filters[a]=i,window.performSearch(n,"vehicles",window.dataStore.filters)}function t(n){if(!n)return"";{const a=window.dataStore.cache.searchData[n];document.querySelector(".modal").classList.add("modal--active"),document.querySelector(".modal").innerHTML=`     \n      <div class="modal-body">\n        <div class="modal-header">\n          <button \n            class="modal-header_btn" \n            onclick="document.querySelector('.modal').classList.remove('modal--active');"\n          >x</button>\n        </div>\n        <div class="modal-wrap">\n          <div class="vehicle-item">\n            <span \n              class="vehicle-type \n                  ${a.is_premium?`type-${a.type}--premium`:`type-${a.type}`}"\n            >\n              ${(0,e.getRomeNumber)(a.tier)}\n            </span>\n            <span \n              class="vehicle-flag vehicle-flag-${a.nation}"\n            ></span>\n            <img \n              class="vehicle-img"\n              src="${a.images.big_icon}"\n              alt="${a.short_name}"\n            > \n          </div>\n          <div>\n            <p class="modal-wrap_title vehicle-prop">\n              <b class="vehicle-name">${a.name}</b> - \n              <b class="vehicle-price ${a.price_credit?"price-silver":"price-gold"}">\n                ${a.price_credit?a.price_credit:a.price_gold?a.price_gold:"-"} \n              </b>\n            </p>\n            <p class="vehicle-prop vehicle-description">${a.description}</p>\n          </div>\n        </div>\n        <div class="modal-content">\n          <div>\n            <h2>Живучесть</h2>\n            <p class="vehicle-prop">\n              <span class="vehicle-hp_title">Прочность: </span>\n              <b class="vehicle-hp">\n                ${a.default_profile.hp}\n              </b>\n            </p>\n            <p class="vehicle-prop">\n              <span class="vehicle-hull_title">Бронирование корпуса (мм): </span>\n              <b class="vehicle-hull">\n                ${Object.values(a.default_profile.armor.hull).join(" / ")}\n              </b>\n            </p>\n            ${a.default_profile.armor.turret?`<p class="vehicle-prop">\n                    <span class="vehicle-hull_title">Бронирование башни (мм): </span>\n                    <b class="vehicle-hull">\n                      ${Object.values(a.default_profile.armor.turret).join(" / ")}\n                    </b>\n                  </p>`:""}\n            <p class="vehicle-prop">\n              <span class="vehicle-weight_title">Масса (кг):</span>\n              <b class="vehicle-weight">\n                ${a.default_profile.weight}\n              </b>\n            </p>\n          </div>\n          <div>\n            <h2>Огневая мощь</h2>\n            <p class="vehicle-prop">\n              <span class="vehicle-damage_title">Урон: </span>\n              <b class="vehicle-damage">\n                ${a.default_profile.ammo.map(e=>e.damage[1]).join(" / ")}\n              </b>\n            </p>\n            <p class="vehicle-prop">\n              <span class="vehicle-penetration_title">Бронепробитие: </span>\n              <b class="vehicle-penetration">\n                ${a.default_profile.ammo.map(e=>e.penetration[1]).join(" / ")}\n              </b>\n            </p>\n            <p class="vehicle-prop">\n              <span class="vehicle-fire_rate_title">Скорострельность (выстр/мин): </span>\n              <b class="vehicle-fire_rate">\n                ${a.default_profile.gun.fire_rate}\n              </b>\n            </p>\n            <p class="vehicle-prop">\n              <span class="vehicle-aim_time_title">Время сведения (с): </span>\n              <b class="vehicle-aim_time">\n                ${a.default_profile.gun.aim_time}\n              </b>\n            </p>\n            <p class="vehicle-prop">\n              <span class="vehicle-dispersion_title">Разброс на 100 м (м): </span>\n              <b class="vehicle-dispersion">\n                ${a.default_profile.gun.dispersion}\n              </b>\n            </p>\n            <p class="vehicle-prop">\n              <span class="vehicle-max_ammo_title">Боекомплект: </span>\n              <b class="vehicle-max_ammo">\n                ${a.default_profile.max_ammo}\n              </b>\n            </p>\n          </div>\n          <div>\n            <h2 class="vehicle-crew_title">Экипаж</h2>\n            <p class="vehicle-prop vehicle-crew">\n              ${a.crew.map((e,n)=>`${++n}. ${Object.values(e.roles).join("-")}`).join("<br>")}\n            </p>\n          </div>\n          <div>\n            <h2 class="vehicle-crew_title">Наблюдение</h2>\n            <p class="vehicle-prop">\n              <span class="vehicle-speed_forward_title">Обзор (м) :</span>\n              <b class="vehicle-speed_forward">\n                ${a.default_profile.turret.view_range}\n              </b>\n            </p>        \n            <p class="vehicle-prop">\n              <span class="vehicle-speed_forward_title">Дальность связи (м) :</span>\n              <b class="vehicle-speed_forward">\n                ${a.default_profile.radio.signal_range}\n              </b>\n            </p>\n          </div>\n          <div>\n            <h2>Передвижение</h2>\n            <p class="vehicle-prop">\n              <span class="vehicle-speed_forward_title">Максимальная скорость (км/ч) :</span>\n              <b class="vehicle-speed_forward">\n                ${a.default_profile.speed_forward}\n              </b>\n            </p>\n            <p class="vehicle-prop">\n              <span class="vehicle-speed_backward_title">Макс. скорость заднего хода (км/ч) :</span>\n              <b class="vehicle-speed_backward">\n                ${a.default_profile.speed_backward}\n              </b>\n            </p>\n          </div>\n          </div>\n          <div class="modal-footer">\n            <button \n              class="modal-footer_btn" \n              onclick="window.dataStore.vehicle_compare.push(${a.tank_id});"\n            >\n             Добавить для сравнения\n            </button>\n          </div>\n      </div>\n    `}}function c(){const n=window.dataStore.cache.searchData;return n?Object.entries((0,e.getFilterList)(n)).map(([n,a])=>{if(a.length>0)return`<div class="search-type">\n                    <h1 class="search-type_title">${n}</h1>\n                    <div class="search-type_wrap">\n                      ${a.map(n=>`\n                            <div \n                              class="vehicle-item"\n                              data-type="vehicleData"\n                              data-id="${n.tank_id}"\n                              onclick="(window.searchById)(this.dataset.id)"\n                            > \n                              <span \n                                class="vehicle-type ${n.is_premium?`type-${n.type}--premium`:`type-${n.type}`}"\n                              >\n                                ${(0,e.getRomeNumber)(n.tier)}\n                              </span>\n                              <span \n                                class="vehicle-flag vehicle-flag-${n.nation}"\n                              ></span>\n                              <img \n                                class="vehicle-img"\n                                src="${n.images.big_icon}"\n                                alt="${n.short_name}"\n                              /> \n                              <span \n                                class="vehicle-title ${n.is_premium?"vehicle-title--premium":""}"\n                              >\n                                ${n.short_name}\n                              </span>\n                            </div>`).join("")}\n                    </div>\n                  </div>`}).join(""):""}function r(){if(window.dataStore.cache.generalData){const{vehicle_types:e}=window.dataStore.cache.generalData;return`\n      <ul class="nation-list">\n          ${Object.keys(e).map(n=>`\n                <li \n                  class="type-item"\n                  data-type="searchData"\n                  data-value="type_${n}"\n                  onclick="(window.searchByFilter)(this);"\n                >\n                  <img \n                    class="type-img"\n                    src="./images/types/${n.toLocaleLowerCase()}.png"\n                    alt="${e[n]}">\n                  <span>\n                    ${e[n]}\n                  </span>\n                </li>`).join("")}\n      </ul>`}return""}function p(){if(window.dataStore.cache.generalData){const{vehicle_nations:e}=window.dataStore.cache.generalData;return`\n      <ul class="nation-list">\n          ${Object.keys(e).map(n=>`\n                <li \n                  class="nation-item"\n                  data-type="searchData"\n                  data-value="nation_${n}"\n                  onclick="(window.searchByFilter)(this);"\n                >\n                  <img \n                    class="nation-img"\n                    src="./images/flags/${n}.png"\n                    alt="${e[n]}"\n                  >\n                  <span>\n                    ${e[n]}\n                  </span>\n                </li>`).join("")}\n      </ul>`}return""}function o(){return`\n    <div class="nation-wrap">\n        <h2 class="nation-title">Нация</h2>\n        ${p()}\n    </div>\n    <div class="type-wrap">\n        <h2 class="type-title">Вид</h2>\n        ${r()}\n    </div>\n    <div class="vehicle-wrap">\n        ${c()}\n    </div>\n    <div class="modal">\n    </div>\n    `}module.hot&&module.hot.accept(),window.dataStore={status:{error:null,process:null},init:{cache:"generalData",path:"info",param:{language:"ru"}},cache:{generalData:null,searchData:null,vehicleData:null},filters:{},vehicle_compare:[],user_compare:[]},window.renderApp=a,window.loadData=i,window.performSearch=l,window.searchByFilter=s,window.searchById=t,l(window.dataStore.init.cache,window.dataStore.init.path,window.dataStore.init.param),a();
},{"./utils":"8MgT","./lang":"tIaq"}]},{},["QdeU"], null)
//# sourceMappingURL=app.bb0923c4.js.map