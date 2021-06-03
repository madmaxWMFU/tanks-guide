/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';
import style from './Footer.css';

function Footer() {
  return (
    <>
      <footer class={style.footer}>
        <ul class={style.footerList}>
          <li class={style.footerItem}>
            <a
              class={`${style.footerLink} ${style.github}`}
              href="https://github.com/madmaxWMFU"
              target="_blank"
            >
              Create by madmaxWMFU
            </a>
          </li>
          <li class={style.footerItem}>
            <a
              class={`${style.footerLink} ${style.wot}`}
              href="https://worldoftanks.ru/"
              target="_blank"
            >
              Main site WOT
            </a>
          </li>
          <li class={style.footerItem}>
            <a
              class={`${style.footerLink} ${style.wargaming}`}
              href="https://developers.wargaming.net/"
              target="_blank"
            >
              Develop site WOT
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
}

export default Footer;
