import React from 'react';
import { getRomeNumber } from '../utils';
import style from './VehicleListCategoryItem.css';

export default function VehicleListCategory({ vehicle, onClickVehicle }) {
  return (
    <li className={style.vehicleItem} data-type="vehicleData">
      <a href="#">
        <span
          className={`${style.vehicleType} ${
            vehicle.is_premium
              ? style[`type-${vehicle.type}--premium`]
              : style[`type-${vehicle.type}`]
          }`}
        >
          {getRomeNumber(vehicle.tier)}
        </span>
        <span className={`${style.vehicleFlag} ${style[`vehicleFlag-${vehicle.nation}`]}`}></span>
        <img
          className={style.vehicleImg}
          src={vehicle.images.big_icon}
          alt={vehicle.short_name}
          data-id={vehicle.tank_id}
          onClick={event => onClickVehicle(event)}
        />
        <span
          className={`${style.vehicleTitle} ${
            vehicle.is_premium ? `${style['vehicleTitle--premium']}` : ''
          }`}
        >
          {vehicle.short_name}
        </span>
      </a>
    </li>
  );
}
