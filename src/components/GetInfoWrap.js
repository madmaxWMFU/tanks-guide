/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import GetInfoUser from './GetInfoUser';
import GetCompareList from './GetCompareList';
import renderApp from '../framework/render';
import style from './GetInfoWrap.css';

export default function GetInfoWrap() {
  const { name, state } = window.dataStore.modal;

  return (
    <>
      <div class={style.user}>
        <input class={style.userInput} id="userInfo" type="checkbox" />
        <label class={style.userLink} for="userInfo"></label>
        <div class={style.userWrap}>
          <GetInfoUser />
        </div>
      </div>
      <div class={style.compare}>
        <a
          class={style.compareLink}
          onclick={e => {
            window.dataStore.modal.name = 'modalCompare';
            window.dataStore.modal.state = true;
            window.performSearch(
              window.dataStore.init.cache,
              window.dataStore.init.path,
              window.dataStore.init.param,
              renderApp,
            );
          }}
        ></a>
      </div>
      <div
        class={`${style.modal} modalCompare ${
          state && name === 'modalCompare' ? style.modalActive : ''
        }`}
      >
        <GetCompareList />
      </div>
    </>
  );
}
