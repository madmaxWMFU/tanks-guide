import React from 'react';
import { LanguageContext } from '../../context';
import { languageList } from '../../data';
import { errorWrap } from './Status.css';

export function ErrorWrap(message, errorData) {
  const { selectedLanguage } = useContext(LanguageContext);
  const {
    status: { errorTitle },
  } = languageList[selectedLanguage];

  return (
    <div className={errorWrap}>
      {errorTitle}: {typeof errorData === 'object' ? errorData.toString() : errorData}
    </div>
  );
}
