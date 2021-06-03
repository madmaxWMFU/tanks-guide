/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';
import imgNationList from '../assets/flags/*.png';
import { nationList, nationInput, nationItem, nationImg } from './GetVehicleNation.css';

export default function GetVehicleNations({
  selectNation,
  nationsList,
  addToSelectNationList,
  deleteFromSelectNationList,
}) {
  if (nationsList !== undefined) {
    return (
      <>
        <div class={nationList}>
          {Object.keys(nationsList).map((nation, key) => {
            return (
              <div>
                <input
                  class={nationInput}
                  id={`nation${key}`}
                  type="checkbox"
                  data-value={nation}
                  checked={selectNation.includes(nation) ? true : false}
                  onclick={event => {
                    const nationValue = event.target.dataset.value;
                    if (selectNation.includes(nationValue)) {
                      deleteFromSelectNationList(nationValue);
                    } else {
                      addToSelectNationList(nationValue);
                    }
                  }}
                />
                <label class={nationItem} For={`nation${key}`}>
                  <img
                    class={nationImg}
                    src={imgNationList[nation]}
                    alt={`${nationsList[nation]}`}
                  />
                  <span>{`${nationsList[nation]}`}</span>
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
