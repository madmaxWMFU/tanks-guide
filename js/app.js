import { getUrl, getRomeNumber, getFilterList, getDateFromUnixTimestamp } from './utils';
import { lang } from './lang';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = {
  status: {
    error: null,
    process: false,
  },
  init: {
    cache: 'generalData',
    path: 'encyclopedia/info',
    param: {
      language: 'ru',
    },
  },
  cache: {
    generalData: null,
    searchData: null,
    compareData: null,
    userAccount: null,
    userData: null,
  },
  user: null,
  filters: {},
  vehicle_compare: [],
};

window.renderApp = renderApp;
window.loadData = loadData;
window.performSearch = performSearch;
window.searchByFilter = searchByFilter;
window.getVehicleInfo = getVehicleInfo;
window.getCompareList = getCompareList;
window.getUserInfo = getUserInfo;
window.getUserData = getUserData;
window.getUserAccountId = getUserAccountId;
window.closeModal = closeModal;

performSearch(
  window.dataStore.init.cache,
  window.dataStore.init.path,
  window.dataStore.init.param,
  'renderApp',
);
renderApp();

function renderApp() {
  document.querySelector('#app-root').innerHTML = `
      ${App()}
  `;
}

async function loadData(path, param) {
  const url = getUrl(path, param);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function performSearch(cache, path, param, func) {
  window.dataStore.status.error = null;
  window.dataStore.status.process = true;
  window
    .loadData(path, param)
    .then(({ error, data }) => {
      window.dataStore.status.process = false;

      if (error) {
        window.dataStore.status.error = 'error';
      } else if (data) {
        window.dataStore.cache[cache] = data;
      }
    })
    .catch(() => {
      window.dataStore.status.error = 'Some error occurred.';
    })
    .finally(window[func]);
}

function searchByFilter(vehicle) {
  const cacheType = vehicle.dataset.type;
  const [key, value] = vehicle.dataset.value.split('_');
  window.dataStore.filters[key] = value;
  window.performSearch(
    'searchData',
    'encyclopedia/vehicles',
    window.dataStore.filters,
    'renderApp',
  );
}

function closeModal(modal, type) {
  modal.closest(`.${type}`).classList.remove('modal--active');
}

function getUserData() {
  const { userAccount } = window.dataStore.cache;
  if (userAccount) {
    const [{ account_id: id }] = dataStore.cache.userAccount;
    window.performSearch('userData', 'account/info', { account_id: id }, 'getUserInfo');
  }
}

function getUserAccountId() {
  const nickname = window.dataStore.user;
  if (nickname) {
    window.performSearch('userAccount', 'account/list', { search: nickname }, 'getUserData');
  }
}

function getUserInfo() {
  const nickname = window.dataStore.user;
  const { userData } = window.dataStore.cache;
  const { language } = window.dataStore.init.param;
  const { userStat } = lang[language];

  if (nickname) {
    if (userData) {
      const statWrap = document.querySelector('.user-stat');
      statWrap.innerHTML = Object.values(userData)
        .map(user => {
          const {
            nickname,
            created_at,
            global_rating,
            statistics: {
              all: {
                battles,
                wins,
                losses,
                survived_battles,
                hits_percents,
                max_damage,
                max_frags,
              },
            },
          } = user;

          return `
            <p>
              <span>${userStat.created_at}:</span>
              <b>${getDateFromUnixTimestamp(created_at)}</b>
            </p>
            <p>
              <span>${userStat.global_rating}</span>
              <b>${global_rating}</b>
            </p>
            <p>
              <span>${userStat.battles}</span>
              <b>${battles}</b>
            </p>
            <p>
              <span>${userStat.wins}</span>
              <b>${wins}</b>
            </p>
            <p>
              <span>${userStat.losses}</span>
              <b>${losses}</b>
            </p>
            <p>
              <span>${userStat.survived_battles}</span>
              <b>${survived_battles}</b>
            </p>
            <p>
              <span>${userStat.hits_percents}</span>
              <b>${hits_percents}</b>
            </p>
            <p>
              <span>${userStat.max_damage}</span>
              <b>${max_damage}</b>
            </p>
            <p>
              <span>${userStat.max_frags}</span>
              <b>${max_frags}</b>
            </p>
          `;
        })
        .join('');
      window.dataStore.user = null;
    } else {
      getUserAccountId();
    }
  } else {
    return `
        <input class="user-search" type="text" onchange="window.dataStore.user = this.value; window.getUserAccountId();" placeholder="${userStat.nickname}"> 
        <div class="user-stat"></div>
    `;
  }
}

function getCompareList() {
  const compareList = window.dataStore.vehicle_compare;
  const compareCacheList = window.dataStore.cache.compareData;

  if (compareList.length != 0) {
    if (!compareCacheList) {
      const idList = compareList.join(',');
      window.performSearch(
        'compareData',
        'encyclopedia/vehicles',
        { tank_id: idList },
        'getCompareList',
      );
    } else {
      const { language } = window.dataStore.init.param;
      const { modal } = lang[language];
      const modalWrap = document.querySelector('.modal.modal-compare');

      modalWrap.classList.add('modal--active');
      modalWrap.innerHTML = `
        <div class="modal-body">
            <div class="modal-header">
              <button 
                class="modal-header_btn" 
                onclick="(window.closeModal)(this, 'modal-compare');"
              >x</button>
            </div>
            <div class="modal-content">
              <div class="modal-compare_list">
                <div>
                  <div class="empty-wrap"></div>
                  <div>${modal.name}</div>
                  <div>${modal.hp}</div>
                  <div>${modal.hull}</div>
                  <div>${modal.turret}</div>
                  <div>${modal.weight}</div>
                  <div>${modal.damage}</div>
                  <div>${modal.penetration}</div>
                  <div>${modal.fire_rate}</div>
                  <div>${modal.aim_time}</div>
                  <div>${modal.dispersion}</div>
                  <div>${modal.view_range}</div>
                  <div>${modal.signal_range}</div>
                  <div>${modal.speed_forward}</div>
                  <div>${modal.speed_backward}</div>
                </div>
                ${Object.values(window.dataStore.cache.compareData)
                  .map(vehicle => {
                    return `
                        <div>
                          <img 
                            class="vehicle-img"
                            src="${vehicle.images.big_icon}"
                            alt="${vehicle.short_name}"
                          > 
                          <p>${vehicle.short_name}</p>
                          <p>${vehicle.default_profile.hp}</p>
                          <p>${Object.values(vehicle.default_profile.armor.hull).join(' / ')}</p>
                          <p>${
                            vehicle.default_profile.armor.turret
                              ? Object.values(vehicle.default_profile.armor.turret).join(' / ')
                              : '- / - / -'
                          }</p>
                          <p>${vehicle.default_profile.weight}</p>
                          <p>${vehicle.default_profile.ammo
                            .map(item => item.damage[1])
                            .join(' / ')}</p>
                          <p>${vehicle.default_profile.ammo
                            .map(item => item.penetration[1])
                            .join(' / ')}</p>
                          <p>${vehicle.default_profile.gun.fire_rate}</p>
                          <p>${vehicle.default_profile.gun.aim_time}</p>
                          <p>${vehicle.default_profile.gun.dispersion}</p>
                          <p>${vehicle.default_profile.turret.view_range}</p>
                          <p>${vehicle.default_profile.radio.signal_range}</p>
                          <p>${vehicle.default_profile.speed_forward}</p>
                          <p>${vehicle.default_profile.speed_backward}</p>
                        </div>
                    `;
                  })
                  .join('')}
              </div>   
            </div>
            <div class="modal-footer">
              <button 
                class="modal-footer_btn" 
                onclick="
                  (window.closeModal)(this, 'modal-compare');
                  window.dataStore.vehicle_compare = [];"
              >
                ${modal.btn_clear_compare}
              </button>
            </div>
        </div>
      `;
    }
  }
}

function getVehicleInfo(id = null) {
  if (id) {
    const { language } = window.dataStore.init.param;
    const { modal } = lang[language];
    const vehicle = window.dataStore.cache.searchData[id];
    const modalWrap = document.querySelector('.modal.modal-vehicle');

    modalWrap.classList.add('modal--active');
    modalWrap.innerHTML = `     
      <div class="modal-body">
        <div class="modal-header">
          <button 
            class="modal-header_btn" 
            onclick="(window.closeModal)(this, 'modal-vehicle');"
          >x</button>
        </div>
        <div class="modal-content">
          <div class="modal-wrap">
            <div class="vehicle-item">
              <span 
                class="vehicle-type 
                  ${vehicle.is_premium ? `type-${vehicle.type}--premium` : `type-${vehicle.type}`}"
              >
                ${getRomeNumber(vehicle.tier)}
              </span>
              <span 
                class="vehicle-flag vehicle-flag-${vehicle.nation}"
              ></span>
              <img 
                class="vehicle-img"
                src="${vehicle.images.big_icon}"
                alt="${vehicle.short_name}"
              > 
            </div>
            <div>
              <p class="modal-wrap_title vehicle-prop">
                <b class="vehicle-name">${vehicle.name}</b> - 
                <b class="vehicle-price ${vehicle.price_credit ? 'price-silver' : 'price-gold'}">
                  ${
                    vehicle.price_credit
                      ? vehicle.price_credit
                      : vehicle.price_gold
                      ? vehicle.price_gold
                      : '-'
                  } 
                </b>
              </p>
              <p class="vehicle-prop vehicle-description">${vehicle.description}</p>
            </div>
          </div>
          <div>
            <h2>
              ${modal.armor}
            </h2>
            <p>
              <span>
                ${modal.hp}: 
              </span>
              <b>
                ${vehicle.default_profile.hp}
              </b>
            </p>
            <p>
              <span>
                ${modal.hull}:
              </span>
              <b>
                ${Object.values(vehicle.default_profile.armor.hull).join(' / ')}
              </b>
            </p>
            ${
              vehicle.default_profile.armor.turret
                ? `<p>
                    <span>
                      ${modal.turret}: 
                    </span>
                    <b>
                      ${Object.values(vehicle.default_profile.armor.turret).join(' / ')}
                    </b>
                  </p>`
                : ''
            }
            <p>
              <span>
              ${modal.weight}:
              </span>
              <b>
                ${vehicle.default_profile.weight}
              </b>
            </p>
          </div>
          <div>
            <h2>
              ${modal.ammo}
            </h2>
            <p>
              <span>
                ${modal.damage}: 
              </span>
              <b>
                ${vehicle.default_profile.ammo
                  .map(item => {
                    return item.damage[1];
                  })
                  .join(' / ')}
              </b>
            </p>
            <p>
              <span>
                ${modal.penetration}: 
              </span>
              <b>
                ${vehicle.default_profile.ammo
                  .map(item => {
                    return item.penetration[1];
                  })
                  .join(' / ')}
              </b>
            </p>
            <p>
              <span>
                ${modal.fire_rate}: 
              </span>
              <b>
                ${vehicle.default_profile.gun.fire_rate}
              </b>
            </p>
            <p>
              <span>
                ${modal.aim_time}: 
              </span>
              <b>
                ${vehicle.default_profile.gun.aim_time}
              </b>
            </p>
            <p>
              <span>
                ${modal.dispersion}: 
              </span>
              <b>
                ${vehicle.default_profile.gun.dispersion}
              </b>
            </p>
            <p>
              <span>
                ${modal.max_ammo}: 
              </span>
              <b>
                ${vehicle.default_profile.max_ammo}
              </b>
            </p>
          </div>
          <div>
            <h2>
              ${modal.crew}
            </h2>
            <p>
              ${vehicle.crew
                .map((member, key) => {
                  return `${++key}. ${Object.values(member.roles).join('-')}`;
                })
                .join('<br>')}
            </p>
          </div>
          <div>
            <h2>
              ${modal.range}
            </h2>
            <p>
              <span>
                ${modal.view_range}:
              </span>
              <b>
                ${vehicle.default_profile.turret.view_range}
              </b>
            </p>        
            <p>
              <span>
                ${modal.signal_range}:
              </span>
              <b>
                ${vehicle.default_profile.radio.signal_range}
              </b>
            </p>
          </div>
          <div>
            <h2>
              ${modal.speed}
            </h2>
            <p>
              <span>
                ${modal.speed_forward}:
              </span>
              <b>
                ${vehicle.default_profile.speed_forward}
              </b>
            </p>
            <p>
              <span>
                ${modal.speed_backward}:
              </span>
              <b>
                ${vehicle.default_profile.speed_backward}
              </b>
            </p>
          </div>
          </div>
          <div class="modal-footer">
            <button 
              class="modal-footer_btn" 
              onclick="
                window.dataStore.vehicle_compare.push(${vehicle.tank_id});
                (window.closeModal)(this, 'modal-vehicle');"
            >
              ${modal.btn_add_compare}
            </button>
          </div>
      </div>
    `;
  } else {
    return '';
  }
}

function getVehicleList() {
  const { language } = window.dataStore.init.param;
  const { typeTank } = lang[language];
  const { searchData } = window.dataStore.cache;

  if (searchData) {
    return Object.entries(getFilterList(searchData))
      .map(([type, list]) => {
        if (list.length > 0) {
          return `
            <div class="search-type">
              <h1 class="search-type_title">
                ${typeTank[type]}
              </h1>
              <div class="search-type_wrap">
                ${list
                  .map(vehicle => {
                    return `
                      <div 
                        class="vehicle-item"
                        data-type="vehicleData"
                        data-id="${vehicle.tank_id}"
                        onclick="(window.getVehicleInfo)(this.dataset.id)"
                      > 
                        <span 
                          class="vehicle-type 
                          ${
                            vehicle.is_premium
                              ? `type-${vehicle.type}--premium`
                              : `type-${vehicle.type}`
                          }"
                        >
                          ${getRomeNumber(vehicle.tier)}
                        </span>
                        <span 
                          class="vehicle-flag 
                                 vehicle-flag-${vehicle.nation}"
                        ></span>
                        <img 
                          class="vehicle-img"
                          src="${vehicle.images.big_icon}"
                          alt="${vehicle.short_name}"
                        /> 
                        <span 
                          class="vehicle-title 
                                ${vehicle.is_premium ? 'vehicle-title--premium' : ''}"
                        >
                          ${vehicle.short_name}
                        </span>
                      </div>
                    `;
                  })
                  .join('')}
              </div>
            </div>
          `;
        }
      })
      .join('');
  } else {
    return '';
  }
}

function getVehicleTypes() {
  if (window.dataStore.cache.generalData) {
    const { vehicle_types: vehicleTypes } = window.dataStore.cache.generalData;

    return `
      <ul class="nation-list">
          ${Object.keys(vehicleTypes)
            .map(type => {
              return `
                <li 
                  class="type-item"
                  data-type="searchData"
                  data-value="type_${type}"
                  onclick="(window.searchByFilter)(this);"
                >
                  <img 
                    class="type-img"
                    src="./images/types/${type.toLocaleLowerCase()}.png"
                    alt="${vehicleTypes[type]}">
                  <span>
                    ${vehicleTypes[type]}
                  </span>
                </li>`;
            })
            .join('')}
      </ul>`;
  } else {
    return '';
  }
}

function getVehicleNations() {
  if (window.dataStore.cache.generalData) {
    const { vehicle_nations: nationList } = window.dataStore.cache.generalData;

    return `
      <ul class="nation-list">
          ${Object.keys(nationList)
            .map(nation => {
              return `
                <li 
                  class="nation-item"
                  data-type="searchData"
                  data-value="nation_${nation}"
                  onclick="(window.searchByFilter)(this);"
                >
                  <img 
                    class="nation-img"
                    src="./images/flags/${nation}.png"
                    alt="${nationList[nation]}"
                  >
                  <span>
                    ${nationList[nation]}
                  </span>
                </li>
              `;
            })
            .join('')}
      </ul>`;
  } else {
    return '';
  }
}

function getVehicleWrap() {
  return `
    <div class="vehicle-wrap">
      ${getVehicleList()}
    </div>
    <div class="modal modal-vehicle">
      ${getVehicleInfo()}
    </div>
  `;
}

function getFilterWrap() {
  const { language } = window.dataStore.init.param;
  const { nation, type } = lang[language];

  return `
    <div class="nation-wrap">
      <h2 class="nation-title">
        ${nation}
      </h2>
      ${getVehicleNations()}
    </div>
    <div class="type-wrap">
      <h2 class="type-title">
        ${type}
      </h2>
      ${getVehicleTypes()}
    </div>
    ${getVehicleWrap()}
  `;
}

function getInfoWrap() {
  return `
    <div class="user">
      <input class="user-input" id="userInfo" type="checkbox">
      <label class="user-link" for="userInfo"></label>
      <div class="user-wrap">
        ${getUserInfo()}
      </div>
    </div>
    <div class="compare">
      <a 
        class="compare-link" 
        onclick="(window.getCompareList)();"
      ></a>
    </div>
    <div class='modal modal-compare'>
      ${getCompareList}
    </div>
  `;
}

function App() {
  return `
    <div class="info-wrap">
      ${getInfoWrap()}
    </div>
    <div class="main-wrap">
      ${getFilterWrap()}
    </div>  
  `;
}
