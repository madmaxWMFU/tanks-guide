import React, { useContext } from 'react';
import { LanguageContext } from '../context';
import { languageList } from '../data';
import imgTypeList from '../assets/types/*.png';
import style from './GetVehicleTypes.css';

export default function GetVehicleTypes({
  error,
  typeData,
  selectType,
  addToSelectTypeList,
  deleteFromSelectTypeList,
}) {
  const { selectLanguage } = useContext(LanguageContext);
  const {
    type,
    status: { errorData },
  } = languageList[selectLanguage];

  if (!typeData) {
    return null;
  }

  if (error) {
    return (
      <div className={style.loadWrap}>
        {errorData}: {typeof error === 'object' ? error.toString() : error}
      </div>
    );
  }

  return (
    <div className={style.typeWrap}>
      <h2 className={style.typeTitle}>{type}</h2>
      <div className={style.typeList}>
        {Object.keys(typeData).map((type, key) => {
          return (
            <div key={key}>
              <input
                className={style.typeInput}
                id={`type${key}`}
                type="checkbox"
                data-value={type}
                checked={selectType.includes(type) ? true : false}
                onChange={event => {
                  const typeValue = event.target.dataset.value;
                  if (selectType.includes(typeValue)) {
                    deleteFromSelectTypeList(typeValue);
                  } else {
                    addToSelectTypeList(typeValue);
                  }
                }}
              />
              <label className={style.typeItem} htmlFor={`type${key}`}>
                <img className={style.typeImg} src={imgTypeList[type]} alt={`${typeData[type]}`} />
                <span>{`${typeData[type]}`}</span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
