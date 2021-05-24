/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import languageList from '../data/languageList';
import { getRomeNumber, closeModal } from '../utils';
import style from './GetVehicleInfo.css';

export function getVehicleInfo() {
  const id = window.dataStore.modal.id;
  const data = window.dataStore.cache.searchData;
  if (id && data) {
    const { language } = window.dataStore.init.param;
    const { modal } = languageList[language];
    const vehicle = data[id];

    return (
      <>
        <div class={style.modalBody}>
          <div class={style.modalHeader}>
            <button
              class={style.modalHeaderBtn}
              onclick={e => {
                closeModal(e.target, 'modalVehicle');
                window.dataStore.modal.id = null;
                window.dataStore.modal.name = null;
                window.dataStore.modal.state = false;
              }}
            >
              x
            </button>
          </div>
          <div class={style.modalContent}>
            <div class={style.modalWrap}>
              <div class={style.vehicleItem}>
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
                />
              </div>
              <div>
                <p class={`${style.modalWrapTitle} ${style.vehicleProp}`}>
                  <b class={style.vehicleName}>{vehicle.name} </b>
                  <b
                    class={`${style.vehiclePrice} ${
                      vehicle.price_credit ? style.priceSilver : style.priceGold
                    }`}
                  >
                    {vehicle.price_credit
                      ? vehicle.price_credit
                      : vehicle.price_gold
                      ? vehicle.price_gold
                      : '-'}
                  </b>
                </p>
                <p class={`${style.vehicleProp} ${style.vehicleDescription}`}>
                  {vehicle.description}
                </p>
              </div>
            </div>
            <div>
              <h2>{modal.armor}</h2>
              <p>
                <span>{modal.hp}:</span>
                <b>{vehicle.default_profile.hp}</b>
              </p>
              <p>
                <span>{modal.hull}:</span>
                <b>{Object.values(vehicle.default_profile.armor.hull).join(' / ')}</b>
              </p>
              <>
                {vehicle.default_profile.armor.turret ? (
                  <p>
                    <span>{modal.turret}:</span>
                    <b>{Object.values(vehicle.default_profile.armor.turret).join(' / ')}</b>
                  </p>
                ) : (
                  ''
                )}
              </>
              <p>
                <span>{modal.weight}:</span>
                <b>{vehicle.default_profile.weight}</b>
              </p>
            </div>
            <div>
              <h2>{modal.ammo}</h2>
              <p>
                <span>{modal.damage}:</span>
                <b>
                  {vehicle.default_profile.ammo
                    .map(item => {
                      return item.damage[1];
                    })
                    .join(' / ')}
                </b>
              </p>
              <p>
                <span>{modal.penetration}:</span>
                <b>
                  {vehicle.default_profile.ammo
                    .map(item => {
                      return item.penetration[1];
                    })
                    .join(' / ')}
                </b>
              </p>
              <p>
                <span>{modal.fire_rate}:</span>
                <b>{vehicle.default_profile.gun.fire_rate}</b>
              </p>
              <p>
                <span>{modal.aim_time}:</span>
                <b>{vehicle.default_profile.gun.aim_time}</b>
              </p>
              <p>
                <span>{modal.dispersion}:</span>
                <b>{vehicle.default_profile.gun.dispersion}</b>
              </p>
              <p>
                <span>{modal.max_ammo}:</span>
                <b>{vehicle.default_profile.max_ammo}</b>
              </p>
            </div>
            <div>
              <h2>{modal.crew}</h2>
              <p>
                {vehicle.crew
                  .map((member, key) => {
                    return `${++key}. ${Object.values(member.roles).join('-')}`;
                  })
                  .join('\n')}
              </p>
            </div>
            <div>
              <h2>{modal.range}</h2>
              <p>
                <span>{modal.view_range}:</span>
                <b>{vehicle.default_profile.turret.view_range}</b>
              </p>
              <p>
                <span>{modal.signal_range}:</span>
                <b>{vehicle.default_profile.radio.signal_range}</b>
              </p>
            </div>
            <div>
              <h2>{modal.speed}</h2>
              <p>
                <span>{modal.speed_forward}:</span>
                <b>{vehicle.default_profile.speed_forward}</b>
              </p>
              <p>
                <span>{modal.speed_backward}:</span>
                <b>{vehicle.default_profile.speed_backward}</b>
              </p>
            </div>
          </div>
          <div class={style.modalFooter}>
            <button
              class={style.modalFooterBtn}
              onclick={e => {
                window.dataStore.vehicle_compare.push(vehicle.tank_id);
                closeModal(e.target, 'modalVehicle');
                window.dataStore.modal.id = null;
                window.dataStore.modal.name = null;
                window.dataStore.modal.state = false;
              }}
            >
              {modal.btn_add_compare}
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return '';
  }
}
