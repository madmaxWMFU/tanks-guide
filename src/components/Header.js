/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import renderApp from '../framework/render';
import style from './Header.css';
import logo from '../assets/page/1.svg';

function Header() {
  return (
    <>
      <header class={style.header}>
        <div class={style.headerLogo}>
          <a class={style.headerLink} href="#">
            <img class={style.logoLinkImg} src={logo} alt="wot logo" />
          </a>
        </div>
        <nav>
          <select
            class={style.lang}
            onchange={e => {
              window.dataStore.init.param.language = e.target.value;
              window.dataStore.filters.language = e.target.value;
              window.dataStore.cache.generalData = null;
              window.performSearch(
                window.dataStore.init.cache,
                window.dataStore.init.path,
                window.dataStore.init.param,
                renderApp,
              );
            }}
          >
            <option value="ru" selected="">
              ru
            </option>
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

export default Header;
