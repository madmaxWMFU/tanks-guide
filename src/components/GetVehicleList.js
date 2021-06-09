import React, { useContext } from 'react';
import { LanguageContext } from '../context';
import { languageList, getFilterList } from '../data';
import { getRomeNumber, isEmptyObject } from '../utils';
import mainImage from '../assets/page/main.jpeg';
import style from './GetVehicleList.css';

export default function GetVehicleList({
  error,
  isLoading,
  searchData,
  setVehicleId,
  setModalVehicleStatus,
}) {
  const { selectLanguage } = useContext(LanguageContext);
  const {
    typeTank,
    status: { errorData, loadData },
    startPage: { title, text },
  } = languageList[selectLanguage];

  if (isLoading) {
    return (
      <div className={style.loadWrap}>
        <span>{loadData}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={style.loadWrap}>
        {errorData}: {typeof error === 'object' ? error.toString() : error}
      </div>
    );
  }

  if (!isEmptyObject(searchData)) {
    return (
      <div className={style.mainWrap}>
        <h1 className={style.mainTitle}>{title}</h1>
        <p className={style.mainText}>{text}</p>
        <img className={style.mainImage} src={mainImage} alt="main image" />
      </div>
    );
  }

  return (
    <div className={style.vehicleWrap}>
      {Object.entries(getFilterList(searchData)).map(([type, list], key) => {
        if (list.length > 0) {
          return (
            <div key={key} className="searchType">
              <h1 className={style.searchTypeTitle}>{`${typeTank[type]}`}</h1>
              <ul className={style.searchTypeWrap}>
                {list.map((vehicle, key) => {
                  return (
                    <li key={key} className={style.vehicleItem} data-type="vehicleData">
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
                        <span
                          className={`${style.vehicleFlag} ${
                            style[`vehicleFlag-${vehicle.nation}`]
                          }`}
                        ></span>
                        <img
                          className={style.vehicleImg}
                          src={vehicle.images.big_icon}
                          alt={vehicle.short_name}
                          data-id={vehicle.tank_id}
                          onClick={event => {
                            setVehicleId(event.target.dataset.id);
                            setModalVehicleStatus(true);
                          }}
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
                })}
              </ul>
            </div>
          );
        }
      })}
    </div>
  );
}
