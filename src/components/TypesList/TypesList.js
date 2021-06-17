import React, { useContext } from 'react';
import { LanguageContext } from '../../context';
import { languageList } from '../../data';
import TypesListItem from '../TypesListItem/TypesListItem';
import style from './TypesList.css';

export default function TypesList({ errorGeneral, typeData, selectType, onChangeType }) {
  const { selectedLanguage } = useContext(LanguageContext);
  const {
    typeTitle,
    status: { errorData },
  } = languageList[selectedLanguage];

  if (!typeData) {
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
    <div className={`${style.typeWrap} filter`}>
      <h2 className={style.typeTitle}>{typeTitle}</h2>
      <ul className={style.typeList}>
        {Object.entries(typeData).map((type, key) => (
          <TypesListItem
            key={key}
            id={key}
            type={type}
            selectType={selectType}
            onChangeType={onChangeType}
          />
        ))}
      </ul>
    </div>
  );
}
