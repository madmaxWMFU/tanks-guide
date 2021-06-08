import React, { useState, useEffect } from 'react';
import { loadData } from '../data';
import GetInfoUser from './GetInfoUser';
import GetCompareList from './GetCompareList';
import style from './GetInfoWrap.css';

export default function GetInfoWrap({ selectLanguage, compareList, setCompareList }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userData, setUserData] = useState({});
  const [compareData, setCompareData] = useState({});
  const [modalCompareStatus, setModalCompareStatus] = useState(false);
  const [modalUserStatus, setModalUserStatus] = useState(false);
  const onKeyPress = event => {
    const {
      key,
      target: { value },
    } = event;
    if (key === 'Enter') {
      setNickname(value);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (nickname) {
      loadData('account/list', { search: nickname })
        .then(data => {
          const {
            message,
            code,
            data: [{ account_id }],
          } = data;

          if (code !== '200' && message) throw Error(message);
          setError(null);
          setUserID(account_id);
        })
        .catch(setError)
        .finally(() => setIsLoading(false));
    }
  }, [nickname]);

  useEffect(() => {
    setIsLoading(true);
    if (userID) {
      loadData('account/info', { account_id: userID })
        .then(data => {
          const { message, code, data: dataList } = data;

          if (code !== '200' && message) throw Error(message);
          setError(null);
          setUserData(dataList);
        })
        .catch(setError)
        .finally(() => setIsLoading(false));
    }
  }, [userID]);

  useEffect(() => {
    setIsLoading(true);
    if (compareList.length != 0) {
      loadData('encyclopedia/vehicles', { tank_id: compareList.join(', ') })
        .then(data => {
          const { message, code, data: dataList } = data;

          if (code !== '200' && message) throw Error(message);
          setError(null);
          setCompareData(dataList);
        })
        .catch(setError)
        .finally(() => setIsLoading(false));
    }
  }, [compareList]);

  return (
    <>
      <div className={style.user}>
        <a className={style.userLink} onClick={setModalUserStatus(!modalUserStatus)}></a>
        <div
          className={`${style.userWrap} modalUser ${modalUserStatus ? style.modalUserActive : ''}`}
        >
          <input className={style.userSearch} type="text" onKeyPress={event => onKeyPress(event)} />
          <GetInfoUser isLoading={isLoading} selectLanguage={selectLanguage} userData={userData} />
        </div>
      </div>
      <div className={style.compare}>
        <a className={style.compareLink} onClick={() => setModalCompareStatus(true)}></a>
        <div
          className={`${style.modal} modalCompare ${modalCompareStatus ? style.modalActive : ''}`}
        >
          <GetCompareList
            error={error}
            isLoading={isLoading}
            selectLanguage={selectLanguage}
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
