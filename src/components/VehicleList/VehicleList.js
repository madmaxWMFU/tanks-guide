import React, { useContext } from 'react';
import { LanguageContext } from '../../context';
import { languageList, getFilterList } from '../../data';
import VehicleListCategory from '../VehicleListCategory';
import { LoadWrap, ErrorWrap } from '../Status';
import style from './VehicleList.css';
import mainImage from '../../assets/page/main.jpeg';

export default function VehicleList({
  errorSearch,
  isSearchLoading,
  selectNation,
  selectType,
  searchData,
  onClickVehicle,
}) {
  const { selectedLanguage } = useContext(LanguageContext);
  const {
    typeTank,
    startPage: { title, text },
  } = languageList[selectedLanguage];

  if (selectNation.length === 0 && selectType.length === 0) {
    return (
      <div className={style.mainWrap}>
        <h1 className={style.mainTitle}>{title}</h1>
        <p className={style.mainText}>{text}</p>
        <img className={style.mainImage} src={mainImage} alt="main image" />
      </div>
    );
  }

  if (isSearchLoading) {
    return <LoadWrap />;
  }

  if (errorSearch) {
    return <ErrorWrap errorData={errorSearch} />;
  }

  return (
    <div className={style.vehicleWrap}>
      {Object.entries(getFilterList(searchData)).map(([type, list]) => {
        if (list.length > 0) {
          return (
            <VehicleListCategory
              key={type}
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
