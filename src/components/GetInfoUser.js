import languageList from '../data/languageList';
import { getDateFromUnixTimestamp } from '../utils';

export default function getUserInfo() {
  const nickname = window.dataStore.user;
  const { userData } = window.dataStore.cache;
  const { language } = window.dataStore.init.param;
  const { userStat } = languageList[language];

  if (nickname) {
    if (userData) {
      const statWrap = document.querySelector('.user-stat');
      statWrap.innerHTML = Object.values(userData)
        .map(user => {
          const {
            nickname,
            created_at,
            global_rating,
            statistics: {
              all: {
                battles,
                wins,
                losses,
                survived_battles,
                hits_percents,
                max_damage,
                max_frags,
              },
            },
          } = user;

          return `
              <p>
                <span>${userStat.created_at}:</span>
                <b>${getDateFromUnixTimestamp(created_at)}</b>
              </p>
              <p>
                <span>${userStat.global_rating}</span>
                <b>${global_rating}</b>
              </p>
              <p>
                <span>${userStat.battles}</span>
                <b>${battles}</b>
              </p>
              <p>
                <span>${userStat.wins}</span>
                <b>${wins}</b>
              </p>
              <p>
                <span>${userStat.losses}</span>
                <b>${losses}</b>
              </p>
              <p>
                <span>${userStat.survived_battles}</span>
                <b>${survived_battles}</b>
              </p>
              <p>
                <span>${userStat.hits_percents}</span>
                <b>${hits_percents}</b>
              </p>
              <p>
                <span>${userStat.max_damage}</span>
                <b>${max_damage}</b>
              </p>
              <p>
                <span>${userStat.max_frags}</span>
                <b>${max_frags}</b>
              </p>
            `;
        })
        .join('');
      window.dataStore.user = null;
    } else {
      getUserAccountId();
    }
  } else {
    return `
          <input class="user-search" type="text" onchange="window.dataStore.user = this.value; window.getUserAccountId();" placeholder="${userStat.nickname}"> 
          <div class="user-stat"></div>
      `;
  }
}
