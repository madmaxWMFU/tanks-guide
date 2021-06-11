import React, { useContext } from 'react';
import { InformationContext } from '../context';
import AccountInformation from './AccountInformation';
import CompareList from './CompareList';
import style from './InfoWrap.css';

export default function InfoWrap() {
  // eslint-disable-next-line prettier/prettier
  const { modalUserStatus, setModalCompareStatus, searchUser, toggleUserInfoModule } = useContext(
    InformationContext,
  );

  return (
    <>
      <div className={style.user}>
        <a className={style.userLink} onClick={() => toggleUserInfoModule()}></a>
        <div
          className={`${style.userWrap} modalUser ${modalUserStatus ? style.modalUserActive : ''}`}
        >
          <input className={style.userSearch} type="text" onKeyPress={event => searchUser(event)} />
          <AccountInformation />
        </div>
      </div>
      <div className={style.compare}>
        <a className={style.compareLink} onClick={() => setModalCompareStatus(true)}></a>
        <CompareList />
      </div>
    </>
  );
}
