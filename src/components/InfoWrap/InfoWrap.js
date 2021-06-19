import React, { useContext } from 'react';
import { InformationContext, LanguageContext } from '../../context';
import AccountInformation from '../AccountInformation';
import CompareList from '../CompareList';
import style from './InfoWrap.css';
import { languageList } from '../../data';
import { getDateFromUnixTimestamp } from '../../utils';

export default function InfoWrap() {
  const {
    toggleAccountModule,
    refAccountModule,
    searchUser,
    userData,
    setModalCompareStatus,
  } = useContext(InformationContext);
  const { selectedLanguage } = useContext(LanguageContext);
  const {
    userStat,
    status: { loadData, errorData },
  } = languageList[selectedLanguage];
  return (
    <>
      <div className={style.user}>
        <a className={style.userLink} onClick={() => toggleAccountModule(style.modalUserActive)} />
        <div className={style.userWrap} ref={refAccountModule}>
          <input className={style.userSearch} type="text" onKeyPress={event => searchUser(event)} />
          {Object.values(userData).map(user => {
            const {
              createdAt,
              globalRating,
              nickname,
              statistics: {
                all: { battles, wins, losses, survivedBattles, hitsPercents, maxDamage, maxFrags },
              },
            } = user;

            return (
              <div key={createdAt}>
                <p>
                  <b>{nickname}</b>
                </p>
                <p>
                  <span>{userStat.created_at}: </span>
                  <b> {getDateFromUnixTimestamp(createdAt)}</b>
                </p>
                <p>
                  <span>{userStat.global_rating}: </span>
                  <b> {globalRating}</b>
                </p>
                <p>
                  <span>{userStat.battles}: </span>
                  <b> {battles}</b>
                </p>
                <p>
                  <span>{userStat.wins}: </span>
                  <b> {wins}</b>
                </p>
                <p>
                  <span>{userStat.losses}: </span>
                  <b> {losses}</b>
                </p>
                <p>
                  <span>{userStat.survived_battles}: </span>
                  <b> {survivedBattles}</b>
                </p>
                <p>
                  <span>{userStat.hits_percents}: </span>
                  <b> {hitsPercents}</b>
                </p>
                <p>
                  <span>{userStat.max_damage}: </span>
                  <b> {maxDamage}</b>
                </p>
                <p>
                  <span>{userStat.max_frags}: </span>
                  <b> {maxFrags}</b>
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={style.compare}>
        <a className={style.compareLink} onClick={() => setModalCompareStatus(true)} />
        <CompareList />
      </div>
    </>
  );
}
