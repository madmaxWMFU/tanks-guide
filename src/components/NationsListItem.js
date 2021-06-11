import React from 'react';
import imgNationList from '../assets/flags/*.png';
import style from './NationsListItem.css';

export default function NationsListItem({ id, nation, selectNation, onChangeNation }) {
  const [keyNation, nameNation] = nation;

  return (
    <li>
      <input
        className={style.nationInput}
        id={`nation${id}`}
        type="checkbox"
        data-value={keyNation}
        checked={selectNation.includes(keyNation) ? true : false}
        onChange={event => onChangeNation(event)}
      />
      <label className={style.nationItem} htmlFor={`nation${id}`}>
        <img className={style.nationImg} src={imgNationList[keyNation]} alt={nameNation} />
        <span>{nameNation}</span>
      </label>
    </li>
  );
}
