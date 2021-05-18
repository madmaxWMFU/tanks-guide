export default function GetVehicleTypes() {
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
