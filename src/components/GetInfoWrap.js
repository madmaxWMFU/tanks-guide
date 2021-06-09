import React, { useContext } from 'react';
import { InformationContext } from '../context';
import GetInfoUser from './GetInfoUser';
import GetCompareList from './GetCompareList';
import style from './GetInfoWrap.css';

export default function GetInfoWrap() {
  const { modalUserStatus, setModalUserStatus, setModalCompareStatus, onKeyPress } = useContext(
    InformationContext,
  );

  return (
    <>
      <div className={style.user}>
        <a className={style.userLink} onClick={() => setModalUserStatus(!modalUserStatus)}></a>
        <div
          className={`${style.userWrap} modalUser ${modalUserStatus ? style.modalUserActive : ''}`}
        >
          <input className={style.userSearch} type="text" onKeyPress={event => onKeyPress(event)} />
          <GetInfoUser />
        </div>
      </div>
      <div className={style.compare}>
        <a className={style.compareLink} onClick={() => setModalCompareStatus(true)}></a>
        <GetCompareList />
      </div>
    </>
  );
}
