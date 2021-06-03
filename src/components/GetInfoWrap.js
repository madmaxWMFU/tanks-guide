/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment, useEffect, useState } from '../framework';
import { loadData } from '../data';
import GetInfoUser from './GetInfoUser';
import GetCompareList from './GetCompareList';
import style from './GetInfoWrap.css';
import { isEmptyObject } from '../utils';

export default function GetInfoWrap({ selectLanguage, compareList, setCompareList }) {
  const [status, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userData, setUserData] = useState({});
  const [compareData, setCompareData] = useState({});
  const [modalCompareStatus, setModalCompareStatus] = useState(false);
  const [modalUserStatus, setModalUserStatus] = useState(false);

  useEffect(() => {
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
      <div class={style.user}>
        <a
          class={style.userLink}
          onclick={() => {
            setModalUserStatus(!modalUserStatus);
            modalUserStatus ? setUserData({}) : null;
          }}
        ></a>
        <div class={`${style.userWrap} modalUser ${modalUserStatus ? style.modalUserActive : ''}`}>
          <input
            class={style.userSearch}
            type="text"
            value={isEmptyObject(userData) ? nickname : ''}
            onchange={event => setNickname(event.target.value)}
          />
          <GetInfoUser selectLanguage={selectLanguage} userData={userData} />
        </div>
      </div>
      <div class={style.compare}>
        <a class={style.compareLink} onclick={() => setModalCompareStatus(true)}></a>
        <div class={`${style.modal} modalCompare ${modalCompareStatus ? style.modalActive : ''}`}>
          <GetCompareList
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
