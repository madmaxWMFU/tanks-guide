/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { searchByFilter } from '../data/tanksData';
import china from '../assets/flags/china.png';
import czech from '../assets/flags/czech.png';
import france from '../assets/flags/france.png';
import germany from '../assets/flags/germany.png';
import italy from '../assets/flags/italy.png';
import japan from '../assets/flags/japan.png';
import poland from '../assets/flags/poland.png';
import sweden from '../assets/flags/sweden.png';
import uk from '../assets/flags/uk.png';
import usa from '../assets/flags/usa.png';
import ussr from '../assets/flags/ussr.png';
import { nationList, nationItem, nationImg } from './GetVehicleNation.css';

export default function GetVehicleNations() {
  if (window.dataStore.cache.generalData) {
    const { vehicle_nations: nationsList } = window.dataStore.cache.generalData;

    return (
      <>
        <ul class={nationList}>
          {Object.keys(nationsList).map(nation => {
            let img = [
              china,
              czech,
              france,
              germany,
              italy,
              japan,
              poland,
              sweden,
              uk,
              usa,
              ussr,
            ].filter(country => country.includes(nation));

            return (
              <li
                class={nationItem}
                data-type="searchData"
                data-value={`nation_${nation}`}
                onclick={event => searchByFilter(event.target)}
              >
                <img class={nationImg} src={img} alt={`${nationsList[nation]}`} />
                <span>{`${nationsList[nation]}`}</span>
              </li>
            );
          })}
        </ul>
      </>
    );
  } else {
    return '';
  }
}
