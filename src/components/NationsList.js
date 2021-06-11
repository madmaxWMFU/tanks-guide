import React, { useContext } from 'react';
import { LanguageContext } from '../context';
import { languageList } from '../data';
import NationsListItem from './NationsListItem';
import style from './NationsList.css';

export default function NationsList({ errorGeneral, nationData, selectNation, onChangeNation }) {
  const { selectLanguage } = useContext(LanguageContext);
  const {
    nationTitle,
    status: { errorData },
  } = languageList[selectLanguage];

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
