import React, { useContext } from 'react';
import { LanguageContext, InformationContext } from '../context';
import { languageList } from '../data';
import { closeModal, isEmptyObject } from '../utils';
import style from './GetCompareList.css';

export default function getCompareList() {
  const {
    compareData,
    setCompareList,
    setCompareData,
    modalCompareStatus,
    setModalCompareStatus,
  } = useContext(InformationContext);
  const { selectLanguage } = useContext(LanguageContext);
  const { modal } = languageList[selectLanguage];

  if (!isEmptyObject(compareData)) {
    return (
      <div className={`${style.modal} modalCompare ${modalCompareStatus ? style.modalActive : ''}`}>
        <div className={style.modalBody}>
          <div className={style.modalHeader}>
            <button
              className={style.modalHeaderBtn}
              onClick={event => {
                closeModal(event.target, 'modalCompare');
                setModalCompareStatus(false);
              }}
            >
              x
            </button>
          </div>
          <div className={style.modalContent}>
            <p className={style.textCenter}>{modal.emptyList}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${style.modal} modalCompare ${modalCompareStatus ? style.modalActive : ''}`}>
      <div className={style.modalBody}>
        <div className={style.modalHeader}>
          <button
            className={style.modalHeaderBtn}
            onClick={event => {
              closeModal(event.target, 'modalCompare');
              setModalCompareStatus(false);
            }}
          >
            x
          </button>
        </div>
        <div className={style.modalContent}>
          <div className={style.modalCompareList}>
            <div>
              <div className={style.emptyWrap}></div>
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
            {Object.values(compareData).map((vehicle, key) => {
              return (
                <div key={key}>
                  <img
                    className={style.vehicleImg}
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
                  <p>{vehicle.default_profile.ammo.map(item => item.penetration[1]).join(' / ')}</p>
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
        <div className={style.modalFooter}>
          <button
            className={style.modalFooterBtn}
            onClick={event => {
              closeModal(event.target, 'modalCompare');
              setModalCompareStatus(false);
              setCompareData({});
              setCompareList([]);
            }}
          >
            {modal.btn_clear_compare}
          </button>
        </div>
      </div>
    </div>
  );
}
