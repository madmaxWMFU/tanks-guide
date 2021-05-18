import languageList from '../data/languageList';
import GetVehicleNations from './GetVehicleNations';
import GetVehicleTypes from './GetVehicleTypes';
import GetVehicleWrap from './GetVehicleWrap';

export default function GetFilterWrap() {
  const { language } = window.dataStore.init.param;
  const { nation, type } = languageList[language];

  return `
    <div class="nation-wrap">
      <h2 class="nation-title">
        ${nation}
      </h2>
      ${GetVehicleNations()}
    </div>
    <div class="type-wrap">
      <h2 class="type-title">
        ${type}
      </h2>
      ${GetVehicleTypes()}
    </div>
    ${GetVehicleWrap()}
  `;
}
