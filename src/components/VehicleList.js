import React, { useContext } from 'react';
import { LanguageContext } from '../context';
import { languageList, getFilterList } from '../data';
import { isEmptyObject } from '../utils';
import VehicleListCategory from './VehicleListCategory';
import mainImage from '../assets/page/main.jpeg';
import style from './VehicleList.css';

export default function VehicleList({ errorSearch, isSearchLoading, searchData, onClickVehicle }) {
  const { selectLanguage } = useContext(LanguageContext);
  const {
    typeTank,
    status: { errorData, loadData },
    startPage: { title, text },
  } = languageList[selectLanguage];

  if (!isEmptyObject(searchData)) {
    return (
      <div className={style.mainWrap}>
        <h1 className={style.mainTitle}>{title}</h1>
        <p className={style.mainText}>{text}</p>
        <img className={style.mainImage} src={mainImage} alt="main image" />
      </div>
    );
  }

  if (isSearchLoading) {
    return (
      <div className={style.loadWrap}>
        <span>{loadData}</span>
      </div>
    );
  }

  if (errorSearch) {
    return (
      <div className={style.loadWrap}>
        {errorData}: {typeof errorSearch === 'object' ? errorSearch.toString() : errorSearch}
      </div>
    );
  }

  return (
    <div className={style.vehicleWrap}>
      {Object.entries(getFilterList(searchData)).map(([type, list], key) => {
        if (list.length > 0) {
          return (
            <VehicleListCategory
              key={key}
              categoryTitle={typeTank[type]}
              list={list}
              onClickVehicle={onClickVehicle}
            />
          );
        }
      })}
    </div>
  );
}
