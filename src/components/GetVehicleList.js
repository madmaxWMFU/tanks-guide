/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import languageList from '../data/languageList';
import getFilterList from '../data/tanksData';
import renderApp from '../framework/render';
import { getRomeNumber } from '../utils';
import style from './GetVehicleList.css';

export default function GetVehicleList() {
  const { language } = window.dataStore.init.param;
  const { searchData } = window.dataStore.cache;
  const { process, error } = window.dataStore.status;
  const { typeTank } = languageList[language];

  let content = '';

  if (process) {
    content = (
      <>
        <p>{'Loading...'}</p>
      </>
    );
  }

  if (error !== null) {
    content = error;
  }

  if (searchData) {
    content = (
      <>
        {Object.entries(getFilterList(searchData)).map(([type, list]) => {
          if (list.length > 0) {
            return (
              <div class={style.searchType}>
                <h1 class={style.searchTypeTitle}>{`${typeTank[type]}`}</h1>
                <div class={style.searchTypeWrap}>
                  {list.map(vehicle => {
                    return (
                      <div class={style.vehicleItem} data-type="vehicleData">
                        <span
                          class={`${style.vehicleType} ${
                            vehicle.is_premium
                              ? style[`type-${vehicle.type}--premium`]
                              : style[`type-${vehicle.type}`]
                          }`}
                        >
                          {getRomeNumber(vehicle.tier)}
                        </span>
                        <span
                          class={`${style.vehicleFlag} ${style[`vehicleFlag-${vehicle.nation}`]}`}
                        ></span>
                        <img
                          class={style.vehicleImg}
                          src={vehicle.images.big_icon}
                          alt={vehicle.short_name}
                          data-id={vehicle.tank_id}
                          onclick={e => {
                            window.dataStore.modal.id = e.target.dataset.id;
                            window.dataStore.modal.name = 'modalVehicle';
                            window.dataStore.modal.state = true;
                            window.performSearch(
                              window.dataStore.init.cache,
                              window.dataStore.init.path,
                              window.dataStore.init.param,
                              renderApp,
                            );
                          }}
                        />
                        <span
                          class={`${style.vehicleTitle} ${
                            vehicle.is_premium ? `${style['vehicleTitle--premium']}` : ''
                          }`}
                        >
                          {vehicle.short_name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
        })}
      </>
    );
  }
  return content;
}
