import React, { useContext } from 'react';
import { LanguageContext, InformationContext } from '../../context';
import { languageList } from '../../data';
import { isEmptyObject } from '../../utils';
import { LoadWrap, ErrorWrap } from '../Status';
import style from './CompareList.css';

export default function CompareList() {
  const { selectedLanguage } = useContext(LanguageContext);
  const { isCompareLoading, errorCompare, compareData, toggleCompareModule } = useContext(
    InformationContext,
  );

  const { modal } = languageList[selectedLanguage];

  if (!isEmptyObject(compareData)) {
    return (
      <div className={style.modalBody}>
        <div className={style.modalHeader}>
          <button
            className={style.modalHeaderBtn}
            onClick={() => toggleCompareModule(style.modalActive)}
          >
            x
          </button>
        </div>
        <div className={style.modalContent}>
          <p className={style.textCenter}>{modal.emptyList}</p>
        </div>
      </div>
    );
  }

  if (isCompareLoading) {
    return <LoadWrap />;
  }

  if (errorCompare) {
    return <ErrorWrap errorData={errorCompare} />;
  }

  return (
    <div className={style.modalBody}>
      <div className={style.modalHeader}>
        <button
          className={style.modalHeaderBtn}
          onClick={() => toggleCompareModule(style.modalActive)}
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
                <p>{turret ? Object.values(turret).join(' / ') : '- / - / -'}</p>
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
          data-value="true"
          onClick={event => toggleCompareModule(style.modalActive, event.target.dataset.value)}
        >
          {modal.btn_clear_compare}
        </button>
      </div>
    </div>
  );
}
