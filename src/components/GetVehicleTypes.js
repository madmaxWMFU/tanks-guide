/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { searchByFilter } from '../data/tanksData';
import atSpg from '../assets/types/AT-SPG.png';
import heavyTank from '../assets/types/heavyTank.png';
import lightTank from '../assets/types/lightTank.png';
import mediumTank from '../assets/types/mediumTank.png';
import spg from '../assets/types/SPG.png';
import { typeList, typeItem, typeImg } from './GetVehicleTypes.css';

export default function GetVehicleTypes() {
  if (window.dataStore.cache.generalData) {
    const { vehicle_types: vehicleTypes } = window.dataStore.cache.generalData;

    return (
      <ul class={typeList}>
        {Object.keys(vehicleTypes).map(type => {
          let img = [atSpg, heavyTank, mediumTank, lightTank, spg].filter(typeImg => {
            if (typeImg.includes('-') && typeImg.includes(type)) {
              return typeImg;
            }

            if (!typeImg.includes('-') && typeImg.includes(type)) {
              return typeImg;
            }
          });
          return (
            <li
              class={typeItem}
              data-type="searchData"
              data-value={`type_${type}`}
              onclick={event => searchByFilter(event.target)}
            >
              <img class={typeImg} src={img} alt={`${vehicleTypes[type]}`} />
              <span>{`${vehicleTypes[type]}`}</span>
            </li>
          );
        })}
      </ul>
    );
  } else {
    return '';
  }
}
