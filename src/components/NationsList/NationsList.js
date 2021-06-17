import React, { useContext } from 'react';
import { LanguageContext } from '../../context';
import { languageList } from '../../data';
import NationsListItem from '../NationsListItem/NationsListItem';
import style from './NationsList.css';

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
    <div className={`${style.nationWrap} filter`}>
      <h2 className={style.nationTitle}>{nationTitle}</h2>
      <ul className={style.nationList}>
        {Object.entries(nationData).map((nation, key) => (
          <NationsListItem
            key={key}
            id={key}
            nation={nation}
            selectNation={selectNation}
            onChangeNation={onChangeNation}
          />
        ))}
      </ul>
    </div>
  );
}
