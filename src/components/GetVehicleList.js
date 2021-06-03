/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';
import { languageList, getFilterList } from '../data';
import { getRomeNumber } from '../utils';
import style from './GetVehicleList.css';

export default function GetVehicleList({
  selectLanguage,
  searchData,
  setVehicleId,
  setModalVehicleStatus,
}) {
  const { typeTank } = languageList[selectLanguage];

  if (searchData) {
    return (
      <>
        {Object.entries(getFilterList(searchData)).map(([type, list]) => {
          if (list.length > 0) {
            return (
              <div class="searchType">
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
                          onclick={event => {
                            setVehicleId(event.target.dataset.id);
                            setModalVehicleStatus(true);
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
}
