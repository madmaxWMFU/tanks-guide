import React from 'react';
import VehicleListCategoryItem from '../VehicleListCategoryItem';
import style from './VehicleListCategory.css';

export default function VehicleListCategory({ categoryTitle, list, onClickVehicle }) {
  return (
    <div className="searchType">
      <h1 className={style.searchTypeTitle}>{categoryTitle}</h1>
      <ul className={style.searchTypeWrap}>
        {list.map((vehicle, key) => (
          <VehicleListCategoryItem key={key} vehicle={vehicle} onClickVehicle={onClickVehicle} />
        ))}
      </ul>
    </div>
  );
}
