import { getUrl, getRomeNumber, getFilterList } from './utils';
import { lang } from './lang';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = {
  status: {
    error: null,
    process: null,
  },
  init: {
    cache: 'generalData',
    path: 'info',
    param: {
      language: 'ru',
    },
  },
  cache: {
    generalData: null,
    searchData: null,
    vehicleData: null,
  },
  filters: {},
  vehicle_compare: [],
  user_compare: [],
};

window.renderApp = renderApp;
window.loadData = loadData;
window.performSearch = performSearch;
window.searchByFilter = searchByFilter;
window.getVehicleInfo = getVehicleInfo;

performSearch(window.dataStore.init.cache, window.dataStore.init.path, window.dataStore.init.param);
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

function performSearch(cache, path, param) {
  window.dataStore.status.process = 'in load';
  window
    .loadData(path, param)
    .then(({ error, data }) => {
      if (error) {
        window.dataStore.status.error = 'error';
      } else if (data) {
        window.dataStore.cache[cache] = data;
      }
    })
    .catch(() => {
      window.dataStore.status.error = 'Some error occurred.';
    })
    .finally(window.renderApp);
}

function searchByFilter(vehicle) {
  const cacheType = vehicle.dataset.type;
  const [key, value] = vehicle.dataset.value.split('_');
  window.dataStore.filters[key] = value;
  window.performSearch(cacheType, 'vehicles', window.dataStore.filters);
}

function getVehicleInfo(id = null) {
  if (id) {
    const vehicle = window.dataStore.cache.searchData[id];
    document.querySelector('.modal').classList.add('modal--active');
    document.querySelector('.modal').innerHTML = `     
      <div class="modal-body">
        <div class="modal-header">
          <button 
            class="modal-header_btn" 
            onclick="document.querySelector('.modal').classList.remove('modal--active');"
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
              ${lang[window.dataStore.init.param.language].modal.armor}
            </h2>
            <p>
              <span>
                ${lang[window.dataStore.init.param.language].modal.hp}: 
              </span>
              <b>
                ${vehicle.default_profile.hp}
              </b>
            </p>
            <p>
              <span>
                ${lang[window.dataStore.init.param.language].modal.hull}:
              </span>
              <b>
                ${Object.values(vehicle.default_profile.armor.hull).join(' / ')}
              </b>
            </p>
            ${
              vehicle.default_profile.armor.turret
                ? `<p>
                    <span>
                      ${lang[window.dataStore.init.param.language].modal.turret}: 
                    </span>
                    <b>
                      ${Object.values(vehicle.default_profile.armor.turret).join(' / ')}
                    </b>
                  </p>`
                : ''
            }
            <p>
              <span>
              ${lang[window.dataStore.init.param.language].modal.weight}:
              </span>
              <b>
                ${vehicle.default_profile.weight}
              </b>
            </p>
          </div>
          <div>
            <h2>
              ${lang[window.dataStore.init.param.language].modal.ammo}
            </h2>
            <p>
              <span>
                ${lang[window.dataStore.init.param.language].modal.damage}: 
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
                ${lang[window.dataStore.init.param.language].modal.penetration}: 
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
                ${lang[window.dataStore.init.param.language].modal.fire_rate}: 
              </span>
              <b>
                ${vehicle.default_profile.gun.fire_rate}
              </b>
            </p>
            <p>
              <span>
                ${lang[window.dataStore.init.param.language].modal.aim_time}: 
              </span>
              <b>
                ${vehicle.default_profile.gun.aim_time}
              </b>
            </p>
            <p>
              <span>
                ${lang[window.dataStore.init.param.language].modal.dispersion}: 
              </span>
              <b>
                ${vehicle.default_profile.gun.dispersion}
              </b>
            </p>
            <p>
              <span>
                ${lang[window.dataStore.init.param.language].modal.max_ammo}: 
              </span>
              <b>
                ${vehicle.default_profile.max_ammo}
              </b>
            </p>
          </div>
          <div>
            <h2>
              ${lang[window.dataStore.init.param.language].modal.crew}
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
              ${lang[window.dataStore.init.param.language].modal.range}
            </h2>
            <p>
              <span>
                ${lang[window.dataStore.init.param.language].modal.view_range}:
              </span>
              <b>
                ${vehicle.default_profile.turret.view_range}
              </b>
            </p>        
            <p>
              <span>
                ${lang[window.dataStore.init.param.language].modal.signal_range}:
              </span>
              <b>
                ${vehicle.default_profile.radio.signal_range}
              </b>
            </p>
          </div>
          <div>
            <h2>
              ${lang[window.dataStore.init.param.language].modal.speed}
            </h2>
            <p>
              <span>
                ${lang[window.dataStore.init.param.language].modal.speed_forward}:
              </span>
              <b>
                ${vehicle.default_profile.speed_forward}
              </b>
            </p>
            <p>
              <span>
                ${lang[window.dataStore.init.param.language].modal.speed_backward}:
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
              onclick="window.dataStore.vehicle_compare.push(${vehicle.tank_id});"
            >
              ${lang[window.dataStore.init.param.language].modal.btn_add_compare}
            </button>
          </div>
      </div>
    `;
  } else {
    return '';
  }
}

function getVehicleList() {
  const data = window.dataStore.cache.searchData;
  if (data) {
    return Object.entries(getFilterList(data))
      .map(([type, list]) => {
        if (list.length > 0) {
          return `<div class="search-type">
                    <h1 class="search-type_title">
                      ${lang[window.dataStore.init.param.language].typeTank[type]}
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
                                class="vehicle-type ${
                                  vehicle.is_premium
                                    ? `type-${vehicle.type}--premium`
                                    : `type-${vehicle.type}`
                                }"
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
                              /> 
                              <span 
                                class="vehicle-title ${
                                  vehicle.is_premium ? 'vehicle-title--premium' : ''
                                }"
                              >
                                ${vehicle.short_name}
                              </span>
                            </div>`;
                        })
                        .join('')}
                    </div>
                  </div>`;
        }
      })
      .join('');
  } else {
    return ``;
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
                </li>`;
            })
            .join('')}
      </ul>`;
  } else {
    return '';
  }
}

function App() {
  return `
    <div class="nation-wrap">
        <h2 class="nation-title">${lang[window.dataStore.init.param.language].nation}</h2>
        ${getVehicleNations()}
    </div>
    <div class="type-wrap">
        <h2 class="type-title">${lang[window.dataStore.init.param.language].nation}</h2>
        ${getVehicleTypes()}
    </div>
    <div class="vehicle-wrap">
        ${getVehicleList()}
    </div>
    <div class="modal">
        ${getVehicleInfo()}
    </div>
    `;
}
