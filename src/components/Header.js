/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import style from './Header.css';
import logo from '../assets/page/1.svg';

export default function Header({ setLanguage }) {
  return (
    <>
      <header class={style.header}>
        <div class={style.headerLogo}>
          <a href="#">
            <img src={logo} alt="wot logo" />
          </a>
        </div>
        <nav>
          <select class={style.lang} onchange={e => setLanguage(e.target.value)}>
            <option value=""></option>
            <option value="ru">ru</option>
            <option value="en">en</option>
            <option value="de">de</option>
            <option value="fr">fr</option>
            <option value="zh-cn">ch</option>
          </select>
        </nav>
      </header>
    </>
  );
}
