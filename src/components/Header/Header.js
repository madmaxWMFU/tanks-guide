import React, { useContext } from 'react';
import style from './Header.css';
import logo from '../../assets/page/1.svg';
import { LanguageContext } from '../../context';

export default function Header() {
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);

  return (
    <header className={style.header}>
      <div className={style.headerLogo}>
        <a href="./index.html">
          <img src={logo} alt="wot logo" />
        </a>
      </div>
      <nav>
        <select
          className={style.lang}
          value={selectedLanguage}
          onChange={event => setSelectedLanguage(event.target.value)}
        >
          <option value="ru">ru</option>
          <option value="en">en</option>
          <option value="de">de</option>
          <option value="fr">fr</option>
          <option value="zh-cn">ch</option>
        </select>
      </nav>
    </header>
  );
}
