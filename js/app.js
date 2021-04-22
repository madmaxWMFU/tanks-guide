import { nationList, vehicleTypes } from './temp_data/generalData';
import { vehicleData } from './temp_data/vehicleData';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = {
  vehicle_types: null,
  vehicle_nation: null,
  vehicle_name: null,
  vehicle_name_compare: [],
  user_compare: [],
  language: 'ru',
};

window.renderVehicleList = function () {
  const { vehicle_nation, vehicle_types } = window.dataStore;
  const vehicleData1 = Object.values(vehicleData).filter(vehicle => {
    if (vehicle.nation === vehicle_nation && vehicle.type === vehicle_types) {
      return vehicle;
    }
  });

  renderVehicle(vehicleData1);
};

function renderVehicle(vehicleList) {
  let list = '';
  vehicleList.forEach(vehicle => {
    list += `
            <div class="vehicle-item" data-id="${vehicle.tank_id}" onclick=""> 
                <span class="vehicle-type ${
                  vehicle.is_premium ? `type-${vehicle.type}--premium` : `type-${vehicle.type}`
                }">${vehicle.tier}</span>
                <span class="vehicle-flag vehicle-flag-${vehicle.nation}"></span>
                <img class="vehicle-img" src="${vehicle.images.big_icon}" alt="${
      vehicle.short_name
    }"> 
                <span class="vehicle-title ${vehicle.is_premium ? 'vehicle-title--premium' : ''}">${
      vehicle.short_name
    }</span>
            </div>
        `;
  });

  document.querySelector('.vehicle-wrap').innerHTML = list;
}

document.querySelector('#app-root').innerHTML = App();

function App() {
  return `
        <div class="nation-wrap">
            ${getVehicleNations(nationList)}
        </div>
        <div class="type-wrap">
            ${getVehicleTypes(vehicleTypes)}
        </div>
        <div class="vehicle-wrap"></div>
    `;
}

function getVehicleNations(nationList) {
  let list = '';
  for (let nation in nationList) {
    list += `
            <li class='nation-item' data-nation="${nation}" onclick="window.dataStore.vehicle_nation = this.dataset.nation; window.renderVehicleList();">
                <img class='nation-img' src='/images/flags/${nation}.png' alt='${nationList[nation]}'>
                <span>${nationList[nation]}</span>
            </li>
        `;
  }
  return `
        <ul class='nation-list'>
            ${list}
        </ul>
    `;
}

function getVehicleTypes(vehicleTypes) {
  let list = '';
  for (let type in vehicleTypes) {
    list += `
            <li class='type-item' data-type="${type}" onclick="window.dataStore.vehicle_types = this.dataset.type; window.renderVehicleList();">
                <img class='type-img' src='/images/types/${type.toLocaleLowerCase()}.png' alt='${
      vehicleTypes[type]
    }'>
                <span>${vehicleTypes[type]}</span>
            </li>
        `;
  }
  return `
        <ul class='type-list'>
            ${list}
        </ul>
    `;
}
