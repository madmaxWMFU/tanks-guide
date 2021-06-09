import React, { useContext } from 'react';
import { LanguageContext } from '../context';
import { languageList } from '../data';
import imgNationList from '../assets/flags/*.png';
import style from './GetVehicleNation.css';

export default function GetVehicleNations({
  error,
  nationData,
  selectNation,
  addToSelectNationList,
  deleteFromSelectNationList,
}) {
  const { selectLanguage } = useContext(LanguageContext);
  const {
    nation,
    status: { errorData },
  } = languageList[selectLanguage];

  if (!nationData) {
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
    <div className={style.nationWrap}>
      <h2 className={style.nationTitle}>{nation}</h2>
      <ul className={style.nationList}>
        {Object.keys(nationData).map((nation, key) => {
          return (
            <li key={key}>
              <input
                className={style.nationInput}
                id={`nation${key}`}
                type="checkbox"
                data-value={nation}
                checked={selectNation.includes(nation) ? true : false}
                onChange={event => {
                  const nationValue = event.target.dataset.value;
                  if (selectNation.includes(nationValue)) {
                    deleteFromSelectNationList(nationValue);
                  } else {
                    addToSelectNationList(nationValue);
                  }
                }}
              />
              <label className={style.nationItem} htmlFor={`nation${key}`}>
                <img
                  className={style.nationImg}
                  src={imgNationList[nation]}
                  alt={`${nationData[nation]}`}
                />
                <span>{`${nationData[nation]}`}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
