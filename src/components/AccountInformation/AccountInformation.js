import React, { useContext } from 'react';
import { LanguageContext, InformationContext } from '../../context';
import { languageList } from '../../data';
import { getDateFromUnixTimestamp } from '../../utils';

export default function AccountInformation() {
  const { isUserLoading, errorUser, userData } = useContext(InformationContext);
  const { selectedLanguage } = useContext(LanguageContext);
  const {
    userStat,
    status: { loadData, errorData },
  } = languageList[selectedLanguage];

  if (isUserLoading) {
    return (
      <div>
        <span>{loadData}</span>
      </div>
    );
  }

  if (errorUser) {
    return (
      <div>
        {errorData}: {typeof errorUser === 'object' ? errorUser.toString() : errorUser}
      </div>
    );
  }

  return Object.values(userData).map((user, key) => {
    const {
      created_at,
      global_rating,
      nickname,
      statistics: {
        all: { battles, wins, losses, survived_battles, hits_percents, max_damage, max_frags },
      },
    } = user;

    return (
      <div key={key}>
        <p>
          <b>{nickname}</b>
        </p>
        <p>
          <span>{userStat.created_at}: </span>
          <b> {getDateFromUnixTimestamp(created_at)}</b>
        </p>
        <p>
          <span>{userStat.global_rating}: </span>
          <b> {global_rating}</b>
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
          <b> {survived_battles}</b>
        </p>
        <p>
          <span>{userStat.hits_percents}: </span>
          <b> {hits_percents}</b>
        </p>
        <p>
          <span>{userStat.max_damage}: </span>
          <b> {max_damage}</b>
        </p>
        <p>
          <span>{userStat.max_frags}: </span>
          <b> {max_frags}</b>
        </p>
      </div>
    );
  });
}
