import React from 'react';
import VehicleListCategoryItem from '../VehicleListCategoryItem';
import style from './VehicleListCategory.css';

export default function VehicleListCategory({ categoryTitle, list, onClickVehicle }) {
  return (
    <div className="searchType">
      <h1 className={style.searchTypeTitle}>{categoryTitle}</h1>
      <ul className={style.searchTypeWrap}>
        {list.map((vehicle, key) => {
          const { tankId } = vehicle;
          return (
            <VehicleListCategoryItem
              key={tankId}
              vehicle={vehicle}
              onClickVehicle={onClickVehicle}
            />
          );
        })}
      </ul>
    </div>
  );
}
