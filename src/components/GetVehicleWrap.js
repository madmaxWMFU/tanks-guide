import GetVehicleList from './GetVehicleList';
import GetVehicleInfo from './GetVehicleInfo';

export default function GetVehicleWrap() {
  return `
    <div class="vehicle-wrap">
      ${GetVehicleList()}
    </div>
    <div class="modal modal-vehicle">
      ${GetVehicleInfo()}
    </div>
  `;
}
