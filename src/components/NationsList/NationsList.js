import React, { useContext } from 'react';
import { LanguageContext } from '../../context';
import { languageList } from '../../data';
import FilterItem from '../FilterItem';
import style from './NationsList.css';
import imgNationList from '../../assets/flags/*.png';

export default function NationsList({ errorGeneral, nationData, selectNation, onChangeNation }) {
  const { selectedLanguage } = useContext(LanguageContext);
  const {
    nationTitle,
    status: { errorData },
  } = languageList[selectedLanguage];

  if (!nationData) {
    return null;
  }

  if (errorGeneral) {
    return (
      <div className={style.loadWrap}>
        {errorData}: {typeof errorGeneral === 'object' ? errorGeneral.toString() : errorGeneral}
      </div>
    );
  }

  return (
    <div className={style.nationWrap}>
      <h2 className={style.nationTitle}>{nationTitle}</h2>
      <ul className={style.nationList}>
        {Object.entries(nationData).map(([keyFilter, nameFilter]) => (
          <FilterItem
            key={keyFilter}
            type="nation"
            imgList={imgNationList}
            keyFilter={keyFilter}
            nameFilter={nameFilter}
            selectData={selectNation}
            handelChange={onChangeNation}
          />
        ))}
      </ul>
    </div>
  );
}
