import React from 'react';
import style from './Footer.css';

export default function Footer() {
  return (
    <footer className={style.footer}>
      <ul className={style.footerList}>
        <li className={style.footerItem}>
          <a
            className={`${style.footerLink} ${style.github}`}
            href="https://github.com/madmaxWMFU"
            target="_blank"
          >
            Create by madmaxWMFU
          </a>
        </li>
        <li className={style.footerItem}>
          <a
            className={`${style.footerLink} ${style.wot}`}
            href="https://worldoftanks.ru/"
            target="_blank"
          >
            Main site WOT
          </a>
        </li>
        <li className={style.footerItem}>
          <a
            className={`${style.footerLink} ${style.wargaming}`}
            href="https://developers.wargaming.net/"
            target="_blank"
          >
            Develop site WOT
          </a>
        </li>
      </ul>
    </footer>
  );
}
