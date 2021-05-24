/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import languageList from '../data/languageList';
import performSearch from '../data/tanksData';
import { closeModal } from '../utils';
import style from './GetCompareList.css';

export default function getCompareList() {
  const compareList = window.dataStore.vehicle_compare;
  const compareCacheList = window.dataStore.cache.compareData;
  const { name, state } = window.dataStore.modal;

  if (compareList.length != 0) {
    if (!compareCacheList) {
      const idList = compareList.join(',');
      performSearch('compareData', 'encyclopedia/vehicles', { tank_id: idList }, performSearch);
    } else if (name === 'modalCompare' && state) {
      const { language } = window.dataStore.init.param;
      const { modal } = languageList[language];

      return (
        <div class={style.modalBody}>
          <div class={style.modalHeader}>
            <button
              class={style.modalHeaderBtn}
              onclick={e => {
                closeModal(e.target, 'modalCompare');
                window.dataStore.modal.name = null;
                window.dataStore.modal.state = false;
              }}
            >
              x
            </button>
          </div>
          <div class={style.modalContent}>
            <div class={style.modalCompareList}>
              <div>
                <div class={style.emptyWrap}></div>
                <div>{modal.name}</div>
                <div>{modal.hp}</div>
                <div>{modal.hull}</div>
                <div>{modal.turret}</div>
                <div>{modal.weight}</div>
                <div>{modal.damage}</div>
                <div>{modal.penetration}</div>
                <div>{modal.fire_rate}</div>
                <div>{modal.aim_time}</div>
                <div>{modal.dispersion}</div>
                <div>{modal.view_range}</div>
                <div>{modal.signal_range}</div>
                <div>{modal.speed_forward}</div>
                <div>{modal.speed_backward}</div>
              </div>
              {Object.values(compareCacheList).map(vehicle => {
                return (
                  <div>
                    <img
                      class={style.vehicleImg}
                      src={vehicle.images.big_icon}
                      alt={vehicle.short_name}
                    />
                    <p>{vehicle.short_name}</p>
                    <p>{vehicle.default_profile.hp}</p>
                    <p>{Object.values(vehicle.default_profile.armor.hull).join(' / ')}</p>
                    <p>
                      {vehicle.default_profile.armor.turret
                        ? Object.values(vehicle.default_profile.armor.turret).join(' / ')
                        : '- / - / -'}
                    </p>
                    <p>{vehicle.default_profile.weight}</p>
                    <p>{vehicle.default_profile.ammo.map(item => item.damage[1]).join(' / ')}</p>
                    <p>
                      {vehicle.default_profile.ammo.map(item => item.penetration[1]).join(' / ')}
                    </p>
                    <p>{vehicle.default_profile.gun.fire_rate}</p>
                    <p>{vehicle.default_profile.gun.aim_time}</p>
                    <p>{vehicle.default_profile.gun.dispersion}</p>
                    <p>{vehicle.default_profile.turret.view_range}</p>
                    <p>{vehicle.default_profile.radio.signal_range}</p>
                    <p>{vehicle.default_profile.speed_forward}</p>
                    <p>{vehicle.default_profile.speed_backward}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div class={style.modalFooter}>
            <button
              class={style.modalFooterBtn}
              onclick={e => {
                closeModal(e.target, 'modal-compare');
                window.dataStore.vehicle_compare = [];
              }}
            >
              {modal.btn_clear_compare}
            </button>
          </div>
        </div>
      );
    }
  }
}
