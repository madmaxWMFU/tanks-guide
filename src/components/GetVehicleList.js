import languageList from '../data/languageList';
import getFilterList from '../data/tanksData';
import { getRomeNumber } from '../utils';

export default function GetVehicleList() {
  const { language } = window.dataStore.init.param;
  const { searchData } = window.dataStore.cache;
  const { process, error } = window.dataStore.status;
  const { typeTank } = languageList[language];

  let content = '';

  if (process) {
    content = 'Loading...';
  }

  if (error !== null) {
    content = error;
  }

  if (searchData) {
    content = Object.entries(getFilterList(searchData))
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
  }

  return content;
}
