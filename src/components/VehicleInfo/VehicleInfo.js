import React, { useContext } from 'react';
import { LanguageContext } from '../../context';
import { languageList } from '../../data';
import { getRomeNumber, closeModal } from '../../utils';
import style from './VehicleInfo.css';

export default function VehicleInfo({
  modalVehicleStatus,
  vehicleId,
  vehicle,
  afterCloseModalVehicle,
}) {
  const { selectedLanguage } = useContext(LanguageContext);
  const {
    modal,
    status: { nullData },
  } = languageList[selectedLanguage];

  if (!vehicle) {
    return <div>{nullData}</div>;
  }

  const {
    isPremium,
    tier,
    type,
    nation,
    images: { bigIcon },
    shortName,
    name,
    priceCredit,
    priceGold,
    description,
    crew,
    defaultProfile: {
      hp,
      armor: { hull, turret },
      turret: { viewRange },
      ammo,
      gun: { fireRate, aimTime, dispersion },
      maxAmmo,
      radio: { signalRange },
      speedForward,
      speedBackward,
      weight,
    },
  } = vehicle;

  return (
    <div className={`${style.modal} modalVehicle ${modalVehicleStatus ? style.modalActive : ''}`}>
      <div className={style.modalBody}>
        <div className={style.modalHeader}>
          <button
            className={style.modalHeaderBtn}
            onClick={event => {
              closeModal(event.target, 'modalVehicle');
              afterCloseModalVehicle(event.target.dataset.id);
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
                  isPremium ? style[`type-${type}--premium`] : style[`type-${type}`]
                }`}
              >
                {getRomeNumber(tier)}
              </span>
              <span className={`${style.vehicleFlag} ${style[`vehicleFlag-${nation}`]}`} />
              <img className={style.vehicleImg} src={bigIcon} alt={shortName} />
            </div>
            <div>
              <p className={`${style.modalWrapTitle} ${style.vehicleProp}`}>
                <b className={style.vehicleName}>{name} </b>
                <b
                  className={`${style.vehiclePrice} ${
                    priceCredit ? style.priceSilver : style.priceGold
                  }`}
                >
                  {priceCredit ? priceCredit : priceGold ? priceGold : '-'}
                </b>
              </p>
              <p className={`${style.vehicleProp} ${style.vehicleDescription}`}>{description}</p>
            </div>
          </div>
          <div>
            <h2>{modal.armor}</h2>
            <p>
              <span>{modal.hp}: </span>
              <b>{hp}</b>
            </p>
            <p>
              <span>{modal.hull}: </span>
              <b>{Object.values(hull).join(' / ')}</b>
            </p>
            <>
              {turret ? (
                <p>
                  <span>{modal.turret}: </span>
                  <b>{Object.values(turret).join(' / ')}</b>
                </p>
              ) : (
                ''
              )}
            </>
            <p>
              <span>{modal.weight}: </span>
              <b>{weight}</b>
            </p>
          </div>
          <div>
            <h2>{modal.ammo}</h2>
            <p>
              <span>{modal.damage}: </span>
              <b>{ammo.map(({ damage: [, point] }) => point).join(' / ')}</b>
            </p>
            <p>
              <span>{modal.penetration}: </span>
              <b>{ammo.map(({ penetration: [, point] }) => point).join(' / ')}</b>
            </p>
            <p>
              <span>{modal.fire_rate}: </span>
              <b>{fireRate}</b>
            </p>
            <p>
              <span>{modal.aim_time}: </span>
              <b>{aimTime}</b>
            </p>
            <p>
              <span>{modal.dispersion}: </span>
              <b>{dispersion}</b>
            </p>
            <p>
              <span>{modal.max_ammo}: </span>
              <b>{maxAmmo}</b>
            </p>
          </div>
          <div>
            <h2>{modal.crew}</h2>
            <p className={style.whiteSpace}>
              {crew
                .map((member, key) => `${++key}. ${Object.values(member.roles).join('-')}`)
                .join('\n')}
            </p>
          </div>
          <div>
            <h2>{modal.range}</h2>
            <p>
              <span>{modal.view_range}: </span>
              <b>{viewRange}</b>
            </p>
            <p>
              <span>{modal.signal_range}: </span>
              <b>{signalRange}</b>
            </p>
          </div>
          <div>
            <h2>{modal.speed}</h2>
            <p>
              <span>{modal.speed_forward}: </span>
              <b>{speedForward}</b>
            </p>
            <p>
              <span>{modal.speed_backward}: </span>
              <b>{speedBackward}</b>
            </p>
          </div>
        </div>
        <div className={style.modalFooter}>
          <button
            className={style.modalFooterBtn}
            data-id={vehicleId}
            onClick={event => {
              closeModal(event.target, 'modalVehicle');
              afterCloseModalVehicle(event.target.dataset.id);
            }}
          >
            {modal.btn_add_compare}
          </button>
        </div>
      </div>
    </div>
  );
}
