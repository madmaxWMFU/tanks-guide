parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"8MgT":[function(require,module,exports) {
"use strict";function e(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function t(t){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?e(Object(o),!0).forEach(function(e){r(t,e,o[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))})}return t}function r(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getRomeNumber=exports.getUrl=exports.getFilterList=void 0;const n={application_id:"42a820be7f4b3fa53490a3eebeae0521"},o=e=>Object.entries(e).map((e,t)=>`${e.join("=")}&`).join(""),i={1:"I",2:"II",3:"III",4:"IV",5:"V",6:"VI",7:"VII",8:"VIII",9:"IX",10:"X"},c=(e,t)=>e.tier-t.tier,a=(e,t)=>Object.values(e).filter(e=>e.type==t),s=e=>Object.values(e).sort((e,t)=>c(e,t)),p=e=>({lightTank:s(a(e,"lightTank")),mediumTank:s(a(e,"mediumTank")),heavyTank:s(a(e,"heavyTank")),"AT-SPG":s(a(e,"AT-SPG")),SPG:s(a(e,"SPG"))});exports.getFilterList=p;const b=(e,r={})=>{let i=t(t({},n),r);return o(i),`https://api.worldoftanks.ru/wot/encyclopedia/${e}/?${o(i)}`};exports.getUrl=b;const l=e=>i[e];exports.getRomeNumber=l;
},{}],"tIaq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.lang=void 0;const e={ru:{nation:"Нация",type:"Вид",modal:{name:"Название",armor:"Живучесть",hp:"Прочность",hull:"Бронирование корпуса (мм)",turret:"Бронирование башни (мм)",weight:"Масса (кг)",ammo:"Огневая мощь",damage:"Урон",penetration:"Бронепробитие",fire_rate:"Скорострельность (выстр/мин)",aim_time:"Время сведения (с)",dispersion:"Разброс на 100 м (м)",max_ammo:"Боекомплект",crew:"Экипаж",range:"Наблюдение",view_range:"Обзор (м)",signal_range:"Дальность связи (м)",speed:"Передвижение",speed_forward:"Максимальная скорость (км/ч)",speed_backward:"Макс. скорость заднего хода (км/ч)",btn_add_compare:"Добавить для сравнения",btn_clear_compare:"Очистить список сравнений"},typeTank:{lightTank:"Легкий танк",mediumTank:"Средний танк",heavyTank:"Тяжёлый танк","AT-SPG":"ПТ-САУ",SPG:"САУ"}},en:{nation:"Nation",type:"Type",modal:{name:"Name",armor:"Vitality",hp:"Strength",hull:"Hull Armor (mm)",turret:"Turret armor (mm)",weight:"Weight (kg)",ammo:"Firepower",damage:"Damage",penetration:"Armor penetration",fire_rate:"Rate of fire (rds / min)",aim_time:"Aiming time (s)",dispersion:"Spread at 100 m (m))",max_ammo:"Ammunition",crew:"Crew",range:"Observation",view_range:"View range (m)",signal_range:"Communication range (m)",speed:"Movement",speed_forward:"Maximum speed (km / h)",speed_backward:"Max. reverse speed (km / h)",btn_add_compare:"Add to Compare",btn_clear_compare:"Clear comparison list"},typeTank:{lightTank:"Light Tank",mediumTank:"Medium Tank",heavyTank:"Heavy Tank","AT-SPG":"Tank Destroyer",SPG:"SPG"}},fr:{nation:"Nation",type:"Vue",modal:{name:"Nom",armor:"Vitalité",hp:"Force",hull:"Blindage de coque (mm)",turret:"Blindage de la tourelle (mm)",weight:"Poids (kg)",ammo:"Puissance de feu",damage:"Endommager",penetration:"Pénétration d`armure",fire_rate:"Cadence de tir (rds / min)",aim_time:"Temps (s) de visée",dispersion:"Écart à 100 m (m)",max_ammo:"Munition",crew:"Équipage",range:"Observation",view_range:"Évaluation (m)",signal_range:"Portée de communication (m)",speed:"Mouvement",speed_forward:"Vitesse maximale (km / h)",speed_backward:"Max. vitesse de marche arrière (km / h)",btn_add_compare:"Ajouter pour comparer",btn_clear_compare:"Effacer la liste de comparaison"},typeTank:{lightTank:"Char léger",mediumTank:"Char moyen",heavyTank:"Char lourd","AT-SPG":"Ch. de chars",SPG:"CAM"}},de:{nation:"Nation",type:"Aussicht",modal:{name:"Name",armor:"Vitalität",hp:"Stärke",hull:"Rumpfrüstung (mm)",turret:"Turmpanzerung (mm)",weight:"Gewicht (kg)",ammo:"Feuerkraft",damage:"Beschädigung",penetration:"Rüstungsdurchdringung",fire_rate:"Feuerrate (rds / min)",aim_time:"Zielzeit (en)",dispersion:"Ausbreitung auf 100 m (m)",max_ammo:"Munition",crew:"Besatzung",range:"Überwachung",view_range:"Rückblick (m)",signal_range:"Kommunikationsreichweite (m)",speed:"Bewegung",speed_forward:"Höchstgeschwindigkeit (km / h)",speed_backward:"Max. Rückwärtsgang (km / h)",btn_add_compare:"Hinzufügen zum vergleichen",btn_clear_compare:"Vergleichsliste löschen"},typeTank:{lightTank:"Leichter Panzer",mediumTank:"Mittlerer Panzer",heavyTank:"Schwere Panzer","AT-SPG":"Jagdpanzer",SPG:"Selbstfahrlafette"}},"zh-cn":{nation:"国家",type:"看法",modal:{name:"名稱",armor:"活力",hp:"力量",hull:"船体装甲（mm)",turret:"炮塔装甲（mm",weight:"重量（公斤",ammo:"火力",damage:"损害",penetration:"护甲穿透",fire_rate:"射速（rds / min",aim_time:"瞄准时间（秒)",dispersion:"传播于100 m（m)",max_ammo:"弹药",crew:"全体人员",range:"观察",view_range:"评论（米)",signal_range:"通讯范围（米)",speed:"移动",speed_forward:"最高速度（公里/小时)",speed_backward:"最大限度。 倒车速度（公里/小时)",btn_add_compare:"加入比较",btn_clear_compare:"清除比較清單"},typeTank:{lightTank:"轻型坦克",mediumTank:"中型坦克",heavyTank:"重型坦克","AT-SPG":"坦克歼击车",SPG:"SPG"}}};exports.lang=e;
},{}],"QdeU":[function(require,module,exports) {
"use strict";var n=require("./utils"),a=require("./lang");function e(){document.querySelector("#app-root").innerHTML=`\n      ${$()}\n  `}async function i(a,e){const i=(0,n.getUrl)(a,e),t=await fetch(i);return await t.json()}function t(n,a,e,i){window.dataStore.status.process="in load",window.loadData(a,e).then(({error:a,data:e})=>{window.dataStore.status.process="load data",a?window.dataStore.status.error="error":e&&(window.dataStore.cache[n]=e)}).catch(()=>{window.dataStore.status.error="Some error occurred."}).finally(window[i])}function r(n){const a=n.dataset.type,[e,i]=n.dataset.value.split("_");window.dataStore.filters[e]=i,window.performSearch(a,"vehicles",window.dataStore.filters,"renderApp")}function o(){return"userInfo"}function l(){const n=window.dataStore.vehicle_compare,e=window.dataStore.cache.compareData;if(0!=n.length)if(e){const{language:n}=window.dataStore.init.param,{modal:e}=a.lang[n],i=document.querySelector(".modal.modal-compare");i.classList.add("modal--active"),i.innerHTML=`\n        <div class="modal-body">\n            <div class="modal-header">\n              <button \n                class="modal-header_btn" \n                onclick="document.querySelector('.modal.modal-compare').classList.remove('modal--active');"\n              >x</button>\n            </div>\n            <div class="modal-content">\n              <div class="modal-compare_list">\n                <div>\n                  <div class="empty-wrap"></div>\n                  <div>${e.name}</div>\n                  <div>${e.hp}</div>\n                  <div>${e.hull}</div>\n                  <div>${e.turret}</div>\n                  <div>${e.weight}</div>\n                  <div>${e.damage}</div>\n                  <div>${e.penetration}</div>\n                  <div>${e.fire_rate}</div>\n                  <div>${e.aim_time}</div>\n                  <div>${e.dispersion}</div>\n                  <div>${e.view_range}</div>\n                  <div>${e.signal_range}</div>\n                  <div>${e.speed_forward}</div>\n                  <div>${e.speed_backward}</div>\n                </div>\n                ${Object.values(window.dataStore.cache.compareData).map(n=>`\n                        <div>\n                          <img \n                            class="vehicle-img"\n                            src="${n.images.big_icon}"\n                            alt="${n.short_name}"\n                          > \n                          <p>${n.short_name}</p>\n                          <p>${n.default_profile.hp}</p>\n                          <p>${Object.values(n.default_profile.armor.hull).join(" / ")}</p>\n                          <p>${n.default_profile.armor.turret?Object.values(n.default_profile.armor.turret).join(" / "):"- / - / -"}</p>\n                          <p>${n.default_profile.weight}</p>\n                          <p>${n.default_profile.ammo.map(n=>n.damage[1]).join(" / ")}</p>\n                          <p>${n.default_profile.ammo.map(n=>n.penetration[1]).join(" / ")}</p>\n                          <p>${n.default_profile.gun.fire_rate}</p>\n                          <p>${n.default_profile.gun.aim_time}</p>\n                          <p>${n.default_profile.gun.dispersion}</p>\n                          <p>${n.default_profile.turret.view_range}</p>\n                          <p>${n.default_profile.radio.signal_range}</p>\n                          <p>${n.default_profile.speed_forward}</p>\n                          <p>${n.default_profile.speed_backward}</p>\n                        </div>\n                    `).join("")}\n              </div>   \n            </div>\n            <div class="modal-footer">\n              <button \n                class="modal-footer_btn" \n                onclick="\n                  window.dataStore.vehicle_compare = [];\n                  window.dataStore.cache.compareData = null;\n                  document.querySelector('.modal.modal-compare').classList.remove('modal--active');"\n              >\n                ${e.btn_clear_compare}\n              </button>\n            </div>\n        </div>\n      `}else{const a=n.join(",");window.performSearch("compareData","vehicles",{tank_id:a},"getCompareList")}}function d(e=null){if(!e)return"";{const{language:i}=window.dataStore.init.param,{modal:t}=a.lang[i],r=window.dataStore.cache.searchData[e],o=document.querySelector(".modal.modal-vehicle");o.classList.add("modal--active"),o.innerHTML=`     \n      <div class="modal-body">\n        <div class="modal-header">\n          <button \n            class="modal-header_btn" \n            onclick="document.querySelector('.modal.modal-vehicle').classList.remove('modal--active');"\n          >x</button>\n        </div>\n        <div class="modal-content">\n          <div class="modal-wrap">\n            <div class="vehicle-item">\n              <span \n                class="vehicle-type \n                  ${r.is_premium?`type-${r.type}--premium`:`type-${r.type}`}"\n              >\n                ${(0,n.getRomeNumber)(r.tier)}\n              </span>\n              <span \n                class="vehicle-flag vehicle-flag-${r.nation}"\n              ></span>\n              <img \n                class="vehicle-img"\n                src="${r.images.big_icon}"\n                alt="${r.short_name}"\n              > \n            </div>\n            <div>\n              <p class="modal-wrap_title vehicle-prop">\n                <b class="vehicle-name">${r.name}</b> - \n                <b class="vehicle-price ${r.price_credit?"price-silver":"price-gold"}">\n                  ${r.price_credit?r.price_credit:r.price_gold?r.price_gold:"-"} \n                </b>\n              </p>\n              <p class="vehicle-prop vehicle-description">${r.description}</p>\n            </div>\n          </div>\n          <div>\n            <h2>\n              ${t.armor}\n            </h2>\n            <p>\n              <span>\n                ${t.hp}: \n              </span>\n              <b>\n                ${r.default_profile.hp}\n              </b>\n            </p>\n            <p>\n              <span>\n                ${t.hull}:\n              </span>\n              <b>\n                ${Object.values(r.default_profile.armor.hull).join(" / ")}\n              </b>\n            </p>\n            ${r.default_profile.armor.turret?`<p>\n                    <span>\n                      ${t.turret}: \n                    </span>\n                    <b>\n                      ${Object.values(r.default_profile.armor.turret).join(" / ")}\n                    </b>\n                  </p>`:""}\n            <p>\n              <span>\n              ${t.weight}:\n              </span>\n              <b>\n                ${r.default_profile.weight}\n              </b>\n            </p>\n          </div>\n          <div>\n            <h2>\n              ${t.ammo}\n            </h2>\n            <p>\n              <span>\n                ${t.damage}: \n              </span>\n              <b>\n                ${r.default_profile.ammo.map(n=>n.damage[1]).join(" / ")}\n              </b>\n            </p>\n            <p>\n              <span>\n                ${t.penetration}: \n              </span>\n              <b>\n                ${r.default_profile.ammo.map(n=>n.penetration[1]).join(" / ")}\n              </b>\n            </p>\n            <p>\n              <span>\n                ${t.fire_rate}: \n              </span>\n              <b>\n                ${r.default_profile.gun.fire_rate}\n              </b>\n            </p>\n            <p>\n              <span>\n                ${t.aim_time}: \n              </span>\n              <b>\n                ${r.default_profile.gun.aim_time}\n              </b>\n            </p>\n            <p>\n              <span>\n                ${t.dispersion}: \n              </span>\n              <b>\n                ${r.default_profile.gun.dispersion}\n              </b>\n            </p>\n            <p>\n              <span>\n                ${t.max_ammo}: \n              </span>\n              <b>\n                ${r.default_profile.max_ammo}\n              </b>\n            </p>\n          </div>\n          <div>\n            <h2>\n              ${t.crew}\n            </h2>\n            <p>\n              ${r.crew.map((n,a)=>`${++a}. ${Object.values(n.roles).join("-")}`).join("<br>")}\n            </p>\n          </div>\n          <div>\n            <h2>\n              ${t.range}\n            </h2>\n            <p>\n              <span>\n                ${t.view_range}:\n              </span>\n              <b>\n                ${r.default_profile.turret.view_range}\n              </b>\n            </p>        \n            <p>\n              <span>\n                ${t.signal_range}:\n              </span>\n              <b>\n                ${r.default_profile.radio.signal_range}\n              </b>\n            </p>\n          </div>\n          <div>\n            <h2>\n              ${t.speed}\n            </h2>\n            <p>\n              <span>\n                ${t.speed_forward}:\n              </span>\n              <b>\n                ${r.default_profile.speed_forward}\n              </b>\n            </p>\n            <p>\n              <span>\n                ${t.speed_backward}:\n              </span>\n              <b>\n                ${r.default_profile.speed_backward}\n              </b>\n            </p>\n          </div>\n          </div>\n          <div class="modal-footer">\n            <button \n              class="modal-footer_btn" \n              onclick="window.dataStore.vehicle_compare.push(${r.tank_id});"\n            >\n              ${t.btn_add_compare}\n            </button>\n          </div>\n      </div>\n    `}}function s(){const{language:e}=window.dataStore.init.param,{typeTank:i}=a.lang[e],{searchData:t}=window.dataStore.cache;return t?Object.entries((0,n.getFilterList)(t)).map(([a,e])=>{if(e.length>0)return`\n            <div class="search-type">\n              <h1 class="search-type_title">\n                ${i[a]}\n              </h1>\n              <div class="search-type_wrap">\n                ${e.map(a=>`\n                      <div \n                        class="vehicle-item"\n                        data-type="vehicleData"\n                        data-id="${a.tank_id}"\n                        onclick="(window.getVehicleInfo)(this.dataset.id)"\n                      > \n                        <span \n                          class="vehicle-type \n                          ${a.is_premium?`type-${a.type}--premium`:`type-${a.type}`}"\n                        >\n                          ${(0,n.getRomeNumber)(a.tier)}\n                        </span>\n                        <span \n                          class="vehicle-flag \n                                 vehicle-flag-${a.nation}"\n                        ></span>\n                        <img \n                          class="vehicle-img"\n                          src="${a.images.big_icon}"\n                          alt="${a.short_name}"\n                        /> \n                        <span \n                          class="vehicle-title \n                                ${a.is_premium?"vehicle-title--premium":""}"\n                        >\n                          ${a.short_name}\n                        </span>\n                      </div>\n                    `).join("")}\n              </div>\n            </div>\n          `}).join(""):""}function p(){if(window.dataStore.cache.generalData){const{vehicle_types:n}=window.dataStore.cache.generalData;return`\n      <ul class="nation-list">\n          ${Object.keys(n).map(a=>`\n                <li \n                  class="type-item"\n                  data-type="searchData"\n                  data-value="type_${a}"\n                  onclick="(window.searchByFilter)(this);"\n                >\n                  <img \n                    class="type-img"\n                    src="./images/types/${a.toLocaleLowerCase()}.png"\n                    alt="${n[a]}">\n                  <span>\n                    ${n[a]}\n                  </span>\n                </li>`).join("")}\n      </ul>`}return""}function c(){if(window.dataStore.cache.generalData){const{vehicle_nations:n}=window.dataStore.cache.generalData;return`\n      <ul class="nation-list">\n          ${Object.keys(n).map(a=>`\n                <li \n                  class="nation-item"\n                  data-type="searchData"\n                  data-value="nation_${a}"\n                  onclick="(window.searchByFilter)(this);"\n                >\n                  <img \n                    class="nation-img"\n                    src="./images/flags/${a}.png"\n                    alt="${n[a]}"\n                  >\n                  <span>\n                    ${n[a]}\n                  </span>\n                </li>\n              `).join("")}\n      </ul>`}return""}function m(){return`\n    <div class="vehicle-wrap">\n      ${s()}\n    </div>\n    <div class="modal modal-vehicle">\n      ${d()}\n    </div>\n  `}function u(){const{language:n}=window.dataStore.init.param,{nation:e,type:i}=a.lang[n];return`\n    <div class="nation-wrap">\n      <h2 class="nation-title">\n        ${e}\n      </h2>\n      ${c()}\n    </div>\n    <div class="type-wrap">\n      <h2 class="type-title">\n        ${i}\n      </h2>\n      ${p()}\n    </div>\n    ${m()}\n  `}function v(){return`\n    <div class="user-wrap">\n      <a \n        class="user-link" \n        onclick='alert("ok")'\n      ></a>\n    </div>\n    <div class="compare-wrap">\n      <a \n        class="compare-link" \n        onclick="(window.getCompareList)();"\n      ></a>\n    </div>\n    <div class='modal modal-compare'>\n      ${l}\n    </div>\n    <div class='modal modal-user'>\n      ${o()}\n    </div>\n  `}function $(){return`\n    <div class="info-wrap">\n      ${v()}\n    </div>\n    <div class="main-wrap">\n      ${u()}\n    </div>  \n  `}module.hot&&module.hot.accept(),window.dataStore={status:{error:null,process:null},init:{cache:"generalData",path:"info",param:{language:"ru"}},cache:{generalData:null,searchData:null,compareData:null,userData:null},filters:{},vehicle_compare:[],user_compare:[]},window.renderApp=e,window.loadData=i,window.performSearch=t,window.searchByFilter=r,window.getVehicleInfo=d,window.getCompareList=l,t(window.dataStore.init.cache,window.dataStore.init.path,window.dataStore.init.param,"renderApp"),e();
},{"./utils":"8MgT","./lang":"tIaq"}]},{},["QdeU"], null)
//# sourceMappingURL=app.a600777a.js.map