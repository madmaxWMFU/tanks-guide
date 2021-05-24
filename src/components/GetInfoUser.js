/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import languageList from '../data/languageList';
import { getUserAccountId } from '../data/tanksData';
import { getDateFromUnixTimestamp } from '../utils';
import { userSearch } from './GetInfoUser.css';

export default function getUserInfo() {
  const nickname = window.dataStore.user;
  const { userData } = window.dataStore.cache;
  const { language } = window.dataStore.init.param;
  const { userStat } = languageList[language];

  if (nickname) {
    if (userData) {
      Object.values(userData).map(user => {
        const {
          created_at,
          global_rating,
          statistics: {
            all: { battles, wins, losses, survived_battles, hits_percents, max_damage, max_frags },
          },
        } = user;

        return (
          <>
            <input
              class={userSearch}
              type="text"
              onchange={event => {
                window.dataStore.user = event.target.value;
                getUserAccountId();
              }}
              placeholder={userStat.nickname}
            />
            <div>
              <p>
                <span>{userStat.created_at}:</span>
                <b>{getDateFromUnixTimestamp(created_at)}</b>
              </p>
              <p>
                <span>{userStat.global_rating}</span>
                <b>{global_rating}</b>
              </p>
              <p>
                <span>{userStat.battles}</span>
                <b>{battles}</b>
              </p>
              <p>
                <span>{userStat.wins}</span>
                <b>{wins}</b>
              </p>
              <p>
                <span>${userStat.losses}</span>
                <b>${losses}</b>
              </p>
              <p>
                <span>{userStat.survived_battles}</span>
                <b>{survived_battles}</b>
              </p>
              <p>
                <span>{userStat.hits_percents}</span>
                <b>{hits_percents}</b>
              </p>
              <p>
                <span>{userStat.max_damage}</span>
                <b>{max_damage}</b>
              </p>
              <p>
                <span>{userStat.max_frags}</span>
                <b>{max_frags}</b>
              </p>
            </div>
          </>
        );
      });
      window.dataStore.user = null;
    } else {
      getUserAccountId();
    }
  } else {
    return (
      <>
        <input
          class={userSearch}
          type="text"
          onchange={event => {
            window.dataStore.user = event.target.value;
            getUserAccountId();
          }}
          placeholder={userStat.nickname}
        />
      </>
    );
  }
}
