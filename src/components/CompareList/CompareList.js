import React, { useContext } from 'react';
import { LanguageContext, InformationContext } from '../../context';
import { languageList } from '../../data';
import { closeModal, isEmptyObject } from '../../utils';
import style from './CompareList.css';

export default function CompareList() {
  const { selectedLanguage } = useContext(LanguageContext);
  const {
    isCompareLoading,
    errorCompare,
    compareData,
    setCompareList,
    compareList,
    setCompareData,
    modalCompareStatus,
    setModalCompareStatus,
  } = useContext(InformationContext);

  const {
    modal,
    status: { loadData, errorData },
  } = languageList[selectedLanguage];

  if (isEmptyObject(compareData)) {
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

  if (isCompareLoading) {
    return (
      <div className={style.loadWrap}>
        <span>{loadData}</span>
      </div>
    );
  }

  if (errorCompare) {
    return (
      <div className={style.loadWrap}>
        {errorData}: {typeof errorCompare === 'object' ? errorCompare.toString() : errorCompare}
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
            {Object.values(compareData).map(vehicle => {
              const {
                tankId,
                images: { bigIcon },
                shortName,
                defaultProfile: {
                  hp,
                  armor: { hull, turret },
                  weight,
                  ammo,
                  gun: { fireRate, aimTime, dispersion },
                  turret: { viewRange },
                  radio: { signalRange },
                  speedForward,
                  speedBackward,
                },
              } = vehicle;

              return (
                <div key={tankId}>
                  <img className={style.vehicleImg} src={bigIcon} alt={shortName} />
                  <p>{shortName}</p>
                  <p>{hp}</p>
                  <p>{Object.values(hull).join(' / ')}</p>
                  <p>
                    {vehicle.default_profile.armor.turret
                      ? Object.values(turret).join(' / ')
                      : '- / - / -'}
                  </p>
                  <p>{weight}</p>
                  <p>{ammo.map(({ damage: [, point] }) => point).join(' / ')}</p>
                  <p>{ammo.map(({ penetration: [, point] }) => point).join(' / ')}</p>
                  <p>{fireRate}</p>
                  <p>{aimTime}</p>
                  <p>{dispersion}</p>
                  <p>{viewRange}</p>
                  <p>{signalRange}</p>
                  <p>{speedForward}</p>
                  <p>{speedBackward}</p>
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
