import React, { useContext } from 'react';
import { LanguageContext, InformationContext } from '../../context';
import { languageList } from '../../data';
import { getDateFromUnixTimestamp } from '../../utils';
import { LoadWrap, ErrorWrap } from '../Status';

export default function AccountInformation() {
  const { isUserLoading, errorUser, userData } = useContext(InformationContext);
  const { selectedLanguage } = useContext(LanguageContext);
  const { userStat } = languageList[selectedLanguage];

  if (isUserLoading) {
    return <LoadWrap />;
  }

  if (errorUser) {
    return <ErrorWrap errorData={errorUser} />;
  }

  return Object.values(userData).map(user => {
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
          <span>{userStat.globalRating}: </span>
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
  });
}
