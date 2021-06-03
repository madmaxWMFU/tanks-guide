/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';
import imgTypeList from '../assets/types/*.png';
import { typeList, typeInput, typeItem, typeImg } from './GetVehicleTypes.css';

export default function GetVehicleTypes({ selectType, vehicleTypes, addToSelectTypeList }) {
  if (vehicleTypes !== undefined) {
    return (
      <>
        <div class={typeList}>
          {Object.keys(vehicleTypes).map((type, key) => {
            return (
              <div>
                <input
                  class={typeInput}
                  id={`type${key}`}
                  type="checkbox"
                  data-value={type}
                  checked={selectType.includes(type) ? true : false}
                  onclick={event => addToSelectTypeList(event.target.dataset.value)}
                />
                <label class={typeItem} For={`type${key}`}>
                  <img class={typeImg} src={imgTypeList[type]} alt={`${vehicleTypes[type]}`} />
                  <span>{`${vehicleTypes[type]}`}</span>
                </label>
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    return '';
  }
}
