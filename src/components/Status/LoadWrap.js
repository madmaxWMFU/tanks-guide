import React, { useContext } from 'react';
import { LanguageContext } from '../../context';
import { languageList } from '../../data';
import { loadWrap } from './Status.css';

export function LoadWrap() {
  const { selectedLanguage } = useContext(LanguageContext);
  const {
    status: { loadData },
  } = languageList[selectedLanguage];

  return (
    <div className={loadWrap}>
      <span>{loadData}</span>
    </div>
  );
}
