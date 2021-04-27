import { getUrl } from './utils';

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
};

window.renderApp = renderApp;
window.loadData = loadData;
window.performSearch = performSearch;
window.searchByFilter = searchByFilter;

performSearch(window.dataStore.init.cache, window.dataStore.init.path, window.dataStore.init.param);
renderApp();

function renderApp() {
  document.querySelector('#app-root').innerHTML = `
        ${App()}
    `;
}

function loadData(path, param) {
  const url = getUrl(path, param);
  return fetch(url)
    .then(response => response.json())
    .then(data => data);
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
  const cacheType = vehicle.type;
  const [key, value] = vehicle.value.split('-');
  window.dataStore.filters[key] = value;
  window.performSearch(cacheType, 'vehicles', window.dataStore.filters);
}

function searchById(vehicle) {
  const cacheType = vehicle.type;
  const [key, value] = vehicle.value.split('-');
  window.dataStore.filters[key] = value;
  window.performSearch(cacheType, 'vehicleprofile', window.dataStore.filters);
}

function getVehicle() {
  const data = window.dataStore.cache.vehicleData;
  const data1 = window.dataStore.cache.searchData;
  if (data) {
    const idVehicle = Object.values(data)[0].tank_id;
    return `
      <div> 
        <p>${data1[idVehicle].description}</p>
        <p>Weight: <b>${Object.values(data)[0].weight}</b></p>
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
            data-type='vehicleData'
            data-value="tank_id-${vehicle.tank_id}" 
            onclick="(${searchById})(this.dataset)"
          > 
            <span 
              class="vehicle-type ${
                vehicle.is_premium ? `type-${vehicle.type}--premium` : `type-${vehicle.type}`
              }"
            >
              ${vehicle.tier}
            </span>
            <span 
              class="vehicle-flag vehicle-flag-${vehicle.nation}"
            ></span>
            <img 
              class="vehicle-img" 
              src="${vehicle.images.big_icon}" 
              alt="${vehicle.short_name}"
            > 
            <span 
              class="vehicle-title ${vehicle.is_premium ? 'vehicle-title--premium' : ''}"
            >
              ${vehicle.short_name}
            </span>
          </div>`;
      })
      .join('');
  } else {
    return '';
  }
}

function getVehicleTypes() {
  const { vehicle_types: vehicleTypes } = window.dataStore.cache.generalData;

  return `
    <ul class='nation-list'>
        ${Object.keys(vehicleTypes)
          .map(type => {
            return `
              <li 
                class='type-item' 
                data-type="searchData"
                data-value="type-${type}" 
                onclick="(${window.searchByFilter})(this.dataset);"
              >
                <img 
                  class='type-img' 
                  src='./images/types/${type.toLocaleLowerCase()}.png' 
                  alt='${vehicleTypes[type]}'>
                <span>
                  ${vehicleTypes[type]}
                </span>
              </li>`;
          })
          .join('')}
    </ul>`;
}

function getVehicleNations() {
  const { vehicle_nations: nationList } = window.dataStore.cache.generalData;

  return `
    <ul class='nation-list'>
        ${Object.keys(nationList)
          .map(nation => {
            return `
              <li 
                class='nation-item' 
                data-type="searchData"
                data-value="nation-${nation}" 
                onclick="(${window.searchByFilter})(this.dataset);"
              >
                <img 
                  class='nation-img' 
                  src='./images/flags/${nation}.png' 
                  alt='${nationList[nation]}'
                >
                <span>
                  ${nationList[nation]}
                </span>
              </li>`;
          })
          .join('')}
    </ul>`;
}

function App() {
  return `
    <div class="nation-wrap">
        ${getVehicleNations()}
    </div>
    <div class="type-wrap">
        ${getVehicleTypes()}
    </div>
    <div class="vehicle-wrap">
        ${getVehicleList()}
    </div>
    <div class="infoVehicle-wrap">
        ${getVehicle()}
    </div>
  `;
}
