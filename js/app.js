import { getUrl, getRomeNumber, addActiveFilter, filterByTier } from './utils';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = {
  activeFilters: {},
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
};

window.renderApp = renderApp;
window.loadData = loadData;
window.performSearch = performSearch;
window.searchByFilter = searchByFilter;
window.searchById = searchById;

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
  addActiveFilter(vehicle);
}

function searchById(id) {
  if (id) {
    const vehicle = window.dataStore.cache.searchData[id];
    document.querySelector('.modal').classList.add('modal--active');
    document.querySelector('.modal').innerHTML = `     <div class="modal-body">
        <div>
          <button onclick="document.querySelector('.modal').classList.remove('modal--active');"></button>
        </div>
        <div class="modal-wrap">
          <div class="vehicle-item">
            <span 
              class="vehicle-type ${
                vehicle.is_premium ? `type-${vehicle.type}--premium` : `type-${vehicle.type}`
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
            > 
          </div>
          <div>
            <p class="vehicle-prop">
              <b class="vehicle-name">${vehicle.name}</b> - 
              <b class="vehicle-price">${vehicle.price_credit}</b>
            </p>
            <p class="vehicle-prop vehicle-description">${vehicle.description}</p>
          </div>
        </div>
        <p class="vehicle-prop">
          <span class="vehicle-hp_title">Прочность: </span><b class="vehicle-hp">${
            vehicle.default_profile.hp
          }</b>
        </p>
        <p class="vehicle-prop">
          <span class="vehicle-max_ammo_title">Боекомплект: </span><b class="vehicle-max_ammo">${
            vehicle.default_profile.max_ammo
          }</b>
        </p>
        <p class="vehicle-prop">
          <span class="vehicle-_title"> :</span><b class="vehicle-">${
            vehicle.default_profile.max_ammo
          }</b>
        </p>
        <p class="vehicle-prop">
          <span class="vehicle-speed_forward_title">Максимальная скорость (км/ч) :</span><b class="vehicle-speed_forward">${
            vehicle.default_profile.speed_forward
          }</b>
        </p>
        <p class="vehicle-prop">
          <span class="vehicle-speed_backward_title">Макс. скорость заднего хода (км/ч) :</span><b class="vehicle-speed_backward">${
            vehicle.default_profile.speed_backward
          }</b>
        </p>
        <p class="vehicle-prop">
          <span class="vehicle-weight_title">Масса (кг):</span><b class="vehicle-weight">${
            vehicle.default_profile.weight
          }</b>
        </p>
      </div>
    `;
  } else {
    return '';
  }
}

function getVehicleList() {
  const data = window.dataStore.cache.searchData;
  if (data) {
    return Object.values(data)
      .map(vehicle => {
        return `
          <div 
            class="vehicle-item"
            data-type="vehicleData"
            data-id="${vehicle.tank_id}"
            onclick="(window.searchById)(this.dataset.id)"
          > 
            <span 
              class="vehicle-type ${
                vehicle.is_premium ? `type-${vehicle.type}--premium` : `type-${vehicle.type}`
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
              class="vehicle-title ${vehicle.is_premium ? 'vehicle-title--premium' : ''}"
            >
              ${vehicle.short_name}
            </span>
          </div>`;
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
        <h2 class="nation-title">Нация</h2>
        ${getVehicleNations()}
    </div>
    <div class="type-wrap">
        <h2 class="type-title">Вид</h2>
        ${getVehicleTypes()}
    </div>
    <div class="vehicle-wrap">
        ${getVehicleList()}
    </div>
    <div class="infoVehicle-wrap modal ">
    </div>
    `;
}
