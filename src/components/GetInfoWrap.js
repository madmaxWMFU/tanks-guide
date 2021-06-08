import React, { useContext } from 'react';
import { InformationContext } from '../context';
// import GetInfoUser from './GetInfoUser';
import GetCompareList from './GetCompareList';
import style from './GetInfoWrap.css';

export default function GetInfoWrap() {
  const {
    compareData,
    modalCompareStatus,
    setCompareList,
    setCompareData,
    setModalCompareStatus,
  } = useContext(InformationContext);

  return (
    <>
      <div className={style.user}></div>
      <div className={style.compare}>
        <a className={style.compareLink} onClick={() => setModalCompareStatus(true)}></a>
        <div
          className={`${style.modal} modalCompare ${modalCompareStatus ? style.modalActive : ''}`}
        >
          <GetCompareList
            compareData={compareData}
            setCompareList={setCompareList}
            setCompareData={setCompareData}
            setModalCompareStatus={setModalCompareStatus}
          />
        </div>
      </div>
    </>
  );
}
