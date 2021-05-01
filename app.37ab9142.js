parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"8MgT":[function(require,module,exports) {
"use strict";function e(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function t(t){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?e(Object(o),!0).forEach(function(e){r(t,e,o[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))})}return t}function r(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getRomeNumber=exports.getUrl=exports.getFilterList=void 0;const n={application_id:"42a820be7f4b3fa53490a3eebeae0521"},o=e=>Object.entries(e).map((e,t)=>`${e.join("=")}&`).join(""),i={1:"I",2:"II",3:"III",4:"IV",5:"V",6:"VI",7:"VII",8:"VIII",9:"IX",10:"X"},c=(e,t)=>e.tier-t.tier,a=(e,t)=>Object.values(e).filter(e=>e.type==t),s=e=>Object.values(e).sort((e,t)=>c(e,t)),p=e=>({lightTank:s(a(e,"lightTank")),mediumTank:s(a(e,"mediumTank")),heavyTank:s(a(e,"heavyTank")),"AT-SPG":s(a(e,"AT-SPG")),SPG:s(a(e,"SPG"))});exports.getFilterList=p;const b=(e,r={})=>{let i=t(t({},n),r);return o(i),`https://api.worldoftanks.ru/wot/encyclopedia/${e}/?${o(i)}`};exports.getUrl=b;const l=e=>i[e];exports.getRomeNumber=l;
},{}],"tIaq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.lang=void 0;const e={ru:{nation:"Нация",type:"Вид",modal:{armor:"Живучесть",hp:"Прочность",hull:"Бронирование корпуса (мм)",turret:"Бронирование башни (мм)",weight:"Масса (кг)",ammo:"Огневая мощь",damage:"Урон",penetration:"Бронепробитие",fire_rate:"Скорострельность (выстр/мин)",aim_time:"Время сведения (с)",dispersion:"Разброс на 100 м (м)",max_ammo:"Боекомплект",crew:"Экипаж",range:"Наблюдение",view_range:"Обзор (м)",signal_range:"Дальность связи (м)",speed:"Передвижение",speed_forward:"Максимальная скорость (км/ч)",speed_backward:"Макс. скорость заднего хода (км/ч)",btn_add_compare:"Добавить для сравнения"},typeTank:{lightTank:"Легкий танк",mediumTank:"Средний танк",heavyTank:"Тяжёлый танк","AT-SPG":"ПТ-САУ",SPG:"САУ"}},en:{nation:"Nation",type:"Type",modal:{armor:"Vitality",hp:"Strength",hull:"Hull Armor (mm)",turret:"Turret armor (mm)",weight:"Weight (kg)",ammo:"Firepower",damage:"Damage",penetration:"Armor penetration",fire_rate:"Rate of fire (rds / min)",aim_time:"Aiming time (s)",dispersion:"Spread at 100 m (m))",max_ammo:"Ammunition",crew:"Crew",range:"Observation",view_range:"View range (m)",signal_range:"Communication range (m)",speed:"Movement",speed_forward:"Maximum speed (km / h)",speed_backward:"Max. reverse speed (km / h)",btn_add_compare:"Add to Compare"},typeTank:{lightTank:"Light Tank",mediumTank:"Medium Tank",heavyTank:"Heavy Tank","AT-SPG":"Tank Destroyer",SPG:"SPG"}},fr:{nation:"Nation",type:"Vue",modal:{armor:"Vitalité",hp:"Force",hull:"Blindage de coque (mm)",turret:"Blindage de la tourelle (mm)",weight:"Poids (kg)",ammo:"Puissance de feu",damage:"Endommager",penetration:"Pénétration d`armure",fire_rate:"Cadence de tir (rds / min)",aim_time:"Temps (s) de visée",dispersion:"Écart à 100 m (m)",max_ammo:"Munition",crew:"Équipage",range:"Observation",view_range:"Évaluation (m)",signal_range:"Portée de communication (m)",speed:"Mouvement",speed_forward:"Vitesse maximale (km / h)",speed_backward:"Max. vitesse de marche arrière (km / h)",btn_add_compare:"Ajouter pour comparer"},typeTank:{lightTank:"Char léger",mediumTank:"Char moyen",heavyTank:"Char lourd","AT-SPG":"Ch. de chars",SPG:"CAM"}},de:{nation:"Nation",type:"Aussicht",modal:{armor:"Vitalität",hp:"Stärke",hull:"Rumpfrüstung (mm)",turret:"Turmpanzerung (mm)",weight:"Gewicht (kg)",ammo:"Feuerkraft",damage:"Beschädigung",penetration:"Rüstungsdurchdringung",fire_rate:"Feuerrate (rds / min)",aim_time:"Zielzeit (en)",dispersion:"Ausbreitung auf 100 m (m)",max_ammo:"Munition",crew:"Besatzung",range:"Überwachung",view_range:"Rückblick (m)",signal_range:"Kommunikationsreichweite (m)",speed:"Bewegung",speed_forward:"Höchstgeschwindigkeit (km / h)",speed_backward:"Max. Rückwärtsgang (km / h)",btn_add_compare:"Hinzufügen zum vergleichen"},typeTank:{lightTank:"Leichter Panzer",mediumTank:"Mittlerer Panzer",heavyTank:"Schwere Panzer","AT-SPG":"Jagdpanzer",SPG:"Selbstfahrlafette"}},"zh-cn":{nation:"国家",type:"看法",modal:{armor:"活力",hp:"力量",hull:"船体装甲（mm)",turret:"炮塔装甲（mm",weight:"重量（公斤",ammo:"火力",damage:"损害",penetration:"护甲穿透",fire_rate:"射速（rds / min",aim_time:"瞄准时间（秒)",dispersion:"传播于100 m（m)",max_ammo:"弹药",crew:"全体人员",range:"观察",view_range:"评论（米)",signal_range:"通讯范围（米)",speed:"移动",speed_forward:"最高速度（公里/小时)",speed_backward:"最大限度。 倒车速度（公里/小时)",btn_add_compare:"加入比较"},typeTank:{lightTank:"轻型坦克",mediumTank:"中型坦克",heavyTank:"重型坦克","AT-SPG":"坦克歼击车",SPG:"SPG"}}};exports.lang=e;
},{}],"QdeU":[function(require,module,exports) {
"use strict";var n=require("./utils"),a=require("./lang");function e(){document.querySelector("#app-root").innerHTML=`\n      ${p()}\n  `}async function t(a,e){const t=(0,n.getUrl)(a,e),i=await fetch(t);return await i.json()}function i(n,a,e){window.dataStore.status.process="in load",window.loadData(a,e).then(({error:a,data:e})=>{a?window.dataStore.status.error="error":e&&(window.dataStore.cache[n]=e)}).catch(()=>{window.dataStore.status.error="Some error occurred."}).finally(window.renderApp)}function l(n){const a=n.dataset.type,[e,t]=n.dataset.value.split("_");window.dataStore.filters[e]=t,window.performSearch(a,"vehicles",window.dataStore.filters)}function o(e=null){if(!e)return"";{const t=window.dataStore.cache.searchData[e];document.querySelector(".modal").classList.add("modal--active"),document.querySelector(".modal").innerHTML=`     \n      <div class="modal-body">\n        <div class="modal-header">\n          <button \n            class="modal-header_btn" \n            onclick="document.querySelector('.modal').classList.remove('modal--active');"\n          >x</button>\n        </div>\n        <div class="modal-content">\n          <div class="modal-wrap">\n            <div class="vehicle-item">\n              <span \n                class="vehicle-type \n                  ${t.is_premium?`type-${t.type}--premium`:`type-${t.type}`}"\n              >\n                ${(0,n.getRomeNumber)(t.tier)}\n              </span>\n              <span \n                class="vehicle-flag vehicle-flag-${t.nation}"\n              ></span>\n              <img \n                class="vehicle-img"\n                src="${t.images.big_icon}"\n                alt="${t.short_name}"\n              > \n            </div>\n            <div>\n              <p class="modal-wrap_title vehicle-prop">\n                <b class="vehicle-name">${t.name}</b> - \n                <b class="vehicle-price ${t.price_credit?"price-silver":"price-gold"}">\n                  ${t.price_credit?t.price_credit:t.price_gold?t.price_gold:"-"} \n                </b>\n              </p>\n              <p class="vehicle-prop vehicle-description">${t.description}</p>\n            </div>\n          </div>\n          <div>\n            <h2>\n              ${a.lang[window.dataStore.init.param.language].modal.armor}\n            </h2>\n            <p>\n              <span>\n                ${a.lang[window.dataStore.init.param.language].modal.hp}: \n              </span>\n              <b>\n                ${t.default_profile.hp}\n              </b>\n            </p>\n            <p>\n              <span>\n                ${a.lang[window.dataStore.init.param.language].modal.hull}:\n              </span>\n              <b>\n                ${Object.values(t.default_profile.armor.hull).join(" / ")}\n              </b>\n            </p>\n            ${t.default_profile.armor.turret?`<p>\n                    <span>\n                      ${a.lang[window.dataStore.init.param.language].modal.turret}: \n                    </span>\n                    <b>\n                      ${Object.values(t.default_profile.armor.turret).join(" / ")}\n                    </b>\n                  </p>`:""}\n            <p>\n              <span>\n              ${a.lang[window.dataStore.init.param.language].modal.weight}:\n              </span>\n              <b>\n                ${t.default_profile.weight}\n              </b>\n            </p>\n          </div>\n          <div>\n            <h2>\n              ${a.lang[window.dataStore.init.param.language].modal.ammo}\n            </h2>\n            <p>\n              <span>\n                ${a.lang[window.dataStore.init.param.language].modal.damage}: \n              </span>\n              <b>\n                ${t.default_profile.ammo.map(n=>n.damage[1]).join(" / ")}\n              </b>\n            </p>\n            <p>\n              <span>\n                ${a.lang[window.dataStore.init.param.language].modal.penetration}: \n              </span>\n              <b>\n                ${t.default_profile.ammo.map(n=>n.penetration[1]).join(" / ")}\n              </b>\n            </p>\n            <p>\n              <span>\n                ${a.lang[window.dataStore.init.param.language].modal.fire_rate}: \n              </span>\n              <b>\n                ${t.default_profile.gun.fire_rate}\n              </b>\n            </p>\n            <p>\n              <span>\n                ${a.lang[window.dataStore.init.param.language].modal.aim_time}: \n              </span>\n              <b>\n                ${t.default_profile.gun.aim_time}\n              </b>\n            </p>\n            <p>\n              <span>\n                ${a.lang[window.dataStore.init.param.language].modal.dispersion}: \n              </span>\n              <b>\n                ${t.default_profile.gun.dispersion}\n              </b>\n            </p>\n            <p>\n              <span>\n                ${a.lang[window.dataStore.init.param.language].modal.max_ammo}: \n              </span>\n              <b>\n                ${t.default_profile.max_ammo}\n              </b>\n            </p>\n          </div>\n          <div>\n            <h2>\n              ${a.lang[window.dataStore.init.param.language].modal.crew}\n            </h2>\n            <p>\n              ${t.crew.map((n,a)=>`${++a}. ${Object.values(n.roles).join("-")}`).join("<br>")}\n            </p>\n          </div>\n          <div>\n            <h2>\n              ${a.lang[window.dataStore.init.param.language].modal.range}\n            </h2>\n            <p>\n              <span>\n                ${a.lang[window.dataStore.init.param.language].modal.view_range}:\n              </span>\n              <b>\n                ${t.default_profile.turret.view_range}\n              </b>\n            </p>        \n            <p>\n              <span>\n                ${a.lang[window.dataStore.init.param.language].modal.signal_range}:\n              </span>\n              <b>\n                ${t.default_profile.radio.signal_range}\n              </b>\n            </p>\n          </div>\n          <div>\n            <h2>\n              ${a.lang[window.dataStore.init.param.language].modal.speed}\n            </h2>\n            <p>\n              <span>\n                ${a.lang[window.dataStore.init.param.language].modal.speed_forward}:\n              </span>\n              <b>\n                ${t.default_profile.speed_forward}\n              </b>\n            </p>\n            <p>\n              <span>\n                ${a.lang[window.dataStore.init.param.language].modal.speed_backward}:\n              </span>\n              <b>\n                ${t.default_profile.speed_backward}\n              </b>\n            </p>\n          </div>\n          </div>\n          <div class="modal-footer">\n            <button \n              class="modal-footer_btn" \n              onclick="window.dataStore.vehicle_compare.push(${t.tank_id});"\n            >\n              ${a.lang[window.dataStore.init.param.language].modal.btn_add_compare}\n            </button>\n          </div>\n      </div>\n    `}}function r(){const e=window.dataStore.cache.searchData;return e?Object.entries((0,n.getFilterList)(e)).map(([e,t])=>{if(t.length>0)return`<div class="search-type">\n                    <h1 class="search-type_title">\n                      ${a.lang[window.dataStore.init.param.language].typeTank[e]}\n                    </h1>\n                    <div class="search-type_wrap">\n                      ${t.map(a=>`\n                            <div \n                              class="vehicle-item"\n                              data-type="vehicleData"\n                              data-id="${a.tank_id}"\n                              onclick="(window.getVehicleInfo)(this.dataset.id)"\n                            > \n                              <span \n                                class="vehicle-type ${a.is_premium?`type-${a.type}--premium`:`type-${a.type}`}"\n                              >\n                                ${(0,n.getRomeNumber)(a.tier)}\n                              </span>\n                              <span \n                                class="vehicle-flag vehicle-flag-${a.nation}"\n                              ></span>\n                              <img \n                                class="vehicle-img"\n                                src="${a.images.big_icon}"\n                                alt="${a.short_name}"\n                              /> \n                              <span \n                                class="vehicle-title ${a.is_premium?"vehicle-title--premium":""}"\n                              >\n                                ${a.short_name}\n                              </span>\n                            </div>`).join("")}\n                    </div>\n                  </div>`}).join(""):""}function d(){if(window.dataStore.cache.generalData){const{vehicle_types:n}=window.dataStore.cache.generalData;return`\n      <ul class="nation-list">\n          ${Object.keys(n).map(a=>`\n                <li \n                  class="type-item"\n                  data-type="searchData"\n                  data-value="type_${a}"\n                  onclick="(window.searchByFilter)(this);"\n                >\n                  <img \n                    class="type-img"\n                    src="./images/types/${a.toLocaleLowerCase()}.png"\n                    alt="${n[a]}">\n                  <span>\n                    ${n[a]}\n                  </span>\n                </li>`).join("")}\n      </ul>`}return""}function s(){if(window.dataStore.cache.generalData){const{vehicle_nations:n}=window.dataStore.cache.generalData;return`\n      <ul class="nation-list">\n          ${Object.keys(n).map(a=>`\n                <li \n                  class="nation-item"\n                  data-type="searchData"\n                  data-value="nation_${a}"\n                  onclick="(window.searchByFilter)(this);"\n                >\n                  <img \n                    class="nation-img"\n                    src="./images/flags/${a}.png"\n                    alt="${n[a]}"\n                  >\n                  <span>\n                    ${n[a]}\n                  </span>\n                </li>`).join("")}\n      </ul>`}return""}function p(){return`\n    <div class="nation-wrap">\n        <h2 class="nation-title">${a.lang[window.dataStore.init.param.language].nation}</h2>\n        ${s()}\n    </div>\n    <div class="type-wrap">\n        <h2 class="type-title">${a.lang[window.dataStore.init.param.language].nation}</h2>\n        ${d()}\n    </div>\n    <div class="vehicle-wrap">\n        ${r()}\n    </div>\n    <div class="modal">\n        ${o()}\n    </div>\n    `}module.hot&&module.hot.accept(),window.dataStore={status:{error:null,process:null},init:{cache:"generalData",path:"info",param:{language:"ru"}},cache:{generalData:null,searchData:null,vehicleData:null},filters:{},vehicle_compare:[],user_compare:[]},window.renderApp=e,window.loadData=t,window.performSearch=i,window.searchByFilter=l,window.getVehicleInfo=o,i(window.dataStore.init.cache,window.dataStore.init.path,window.dataStore.init.param),e();
},{"./utils":"8MgT","./lang":"tIaq"}]},{},["QdeU"], null)
//# sourceMappingURL=app.37ab9142.js.map