import React, { useContext } from 'react';
import { LanguageContext } from '../../context';
import { languageList } from '../../data';
import FilterItem from '../FilterItem';
import style from './TypesList.css';
import { ErrorWrap } from '../Status';
import imgTypeList from '../../assets/types/*.png';

export default function TypesList({ errorGeneral, typeData, selectType, onChangeType }) {
  const { selectedLanguage } = useContext(LanguageContext);
  const { typeTitle } = languageList[selectedLanguage];

  if (!typeData) {
    return null;
  }

  if (errorGeneral) {
    return <ErrorWrap errorData={errorGeneral} />;
  }

  return (
    <div className={style.typeWrap}>
      <h2 className={style.typeTitle}>{typeTitle}</h2>
      <ul className={style.typeList}>
        {Object.entries(typeData).map(([keyType, nameType]) => (
          <FilterItem
            key={keyType}
            type="type"
            imgList={imgTypeList}
            keyFilter={keyType}
            nameFilter={nameType}
            selectData={selectType}
            handelChange={onChangeType}
          />
        ))}
      </ul>
    </div>
  );
}
