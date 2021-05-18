export default function GetVehicleNations() {
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
