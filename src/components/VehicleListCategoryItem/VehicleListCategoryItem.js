import React from 'react';
import { getRomeNumber } from '../../utils';
import style from './VehicleListCategoryItem.css';

export default function VehicleListCategory({ vehicle, onClickVehicle }) {
  const {
    isPremium,
    tier,
    type,
    nation,
    images: { bigIcon },
    shortName,
    tankId,
  } = vehicle;

  return (
    <li className={style.vehicleItem} data-type="vehicleData">
      <span
        className={`${style.vehicleType} ${
          isPremium ? style[`type-${type}--premium`] : style[`type-${type}`]
        }`}
      >
        {getRomeNumber(tier)}
      </span>
      <span className={`${style.vehicleFlag} ${style[`vehicleFlag-${nation}`]}`} />
      <img
        className={style.vehicleImg}
        src={bigIcon}
        alt={shortName}
        data-id={tankId}
        onClick={event => onClickVehicle(event.target.dataset.id)}
      />
      <span
        className={`${style.vehicleTitle} ${isPremium ? `${style['vehicleTitle--premium']}` : ''}`}
      >
        {shortName}
      </span>
    </li>
  );
}
