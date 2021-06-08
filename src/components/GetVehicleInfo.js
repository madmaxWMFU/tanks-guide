import React, { useContext } from 'react';
import { LanguageContext } from '../context';
import { languageList } from '../data';
import { getRomeNumber, closeModal } from '../utils';
import style from './GetVehicleInfo.css';

export default function GetVehicleInfo({
  vehicle,
  setVehicleId,
  setModalVehicleStatus,
  vehicleId,
  addToCompareList,
}) {
  const { selectLanguage } = useContext(LanguageContext);
  const {
    modal,
    status: { nullData },
  } = languageList[selectLanguage];

  if (!vehicle) {
    return <div>{nullData}</div>;
  }

  return (
    <>
      <div className={style.modalBody}>
        <div className={style.modalHeader}>
          <button
            className={style.modalHeaderBtn}
            onClick={event => {
              closeModal(event.target, 'modalVehicle');
              setVehicleId(null);
              setModalVehicleStatus(false);
            }}
          >
            x
          </button>
        </div>
        <div className={style.modalContent}>
          <div className={style.modalWrap}>
            <div className={style.vehicleItem}>
              <span
                className={`${style.vehicleType} ${
                  vehicle['is_premium']
                    ? style[`type-${vehicle.type}--premium`]
                    : style[`type-${vehicle.type}`]
                }`}
              >
                {getRomeNumber(vehicle.tier)}
              </span>
              <span
                className={`${style.vehicleFlag} ${style[`vehicleFlag-${vehicle.nation}`]}`}
              ></span>
              <img
                className={style.vehicleImg}
                src={vehicle.images.big_icon}
                alt={vehicle.short_name}
              />
            </div>
            <div>
              <p className={`${style.modalWrapTitle} ${style.vehicleProp}`}>
                <b className={style.vehicleName}>{vehicle.name} </b>
                <b
                  className={`${style.vehiclePrice} ${
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
              <p className={`${style.vehicleProp} ${style.vehicleDescription}`}>
                {vehicle.description}
              </p>
            </div>
          </div>
          <div>
            <h2>{modal.armor}</h2>
            <p>
              <span>{modal.hp}: </span>
              <b>{vehicle.default_profile.hp}</b>
            </p>
            <p>
              <span>{modal.hull}: </span>
              <b>{Object.values(vehicle.default_profile.armor.hull).join(' / ')}</b>
            </p>
            <>
              {vehicle.default_profile.armor.turret ? (
                <p>
                  <span>{modal.turret}: </span>
                  <b>{Object.values(vehicle.default_profile.armor.turret).join(' / ')}</b>
                </p>
              ) : (
                ''
              )}
            </>
            <p>
              <span>{modal.weight}: </span>
              <b>{vehicle.default_profile.weight}</b>
            </p>
          </div>
          <div>
            <h2>{modal.ammo}</h2>
            <p>
              <span>{modal.damage}: </span>
              <b>
                {vehicle.default_profile.ammo
                  .map(item => {
                    return item.damage[1];
                  })
                  .join(' / ')}
              </b>
            </p>
            <p>
              <span>{modal.penetration}: </span>
              <b>
                {vehicle.default_profile.ammo
                  .map(item => {
                    return item.penetration[1];
                  })
                  .join(' / ')}
              </b>
            </p>
            <p>
              <span>{modal.fire_rate}: </span>
              <b>{vehicle.default_profile.gun.fire_rate}</b>
            </p>
            <p>
              <span>{modal.aim_time}: </span>
              <b>{vehicle.default_profile.gun.aim_time}</b>
            </p>
            <p>
              <span>{modal.dispersion}: </span>
              <b>{vehicle.default_profile.gun.dispersion}</b>
            </p>
            <p>
              <span>{modal.max_ammo}: </span>
              <b>{vehicle.default_profile.max_ammo}</b>
            </p>
          </div>
          <div>
            <h2>{modal.crew}</h2>
            <p className={style.whiteSpace}>
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
              <span>{modal.view_range}: </span>
              <b>{vehicle.default_profile.turret.view_range}</b>
            </p>
            <p>
              <span>{modal.signal_range}: </span>
              <b>{vehicle.default_profile.radio.signal_range}</b>
            </p>
          </div>
          <div>
            <h2>{modal.speed}</h2>
            <p>
              <span>{modal.speed_forward}: </span>
              <b>{vehicle.default_profile.speed_forward}</b>
            </p>
            <p>
              <span>{modal.speed_backward}: </span>
              <b>{vehicle.default_profile.speed_backward}</b>
            </p>
          </div>
        </div>
        <div className={style.modalFooter}>
          <button
            className={style.modalFooterBtn}
            data-id={vehicleId}
            onClick={event => {
              closeModal(event.target, 'modalVehicle');
              setVehicleId(null);
              setModalVehicleStatus(false);
              addToCompareList(event.target.dataset.id);
            }}
          >
            {modal.btn_add_compare}
          </button>
        </div>
      </div>
    </>
  );
}
