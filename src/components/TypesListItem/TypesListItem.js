import React from 'react';
import imgTypeList from '../../assets/types/*.png';
import style from './TypesListItem.css';

export default function TypesListItem({ id, type, selectType, onChangeType }) {
  const [keyType, nameType] = type;

  return (
    <li>
      <input
        className={style.typeInput}
        id={`type${id}`}
        type="checkbox"
        data-value={keyType}
        checked={selectType.includes(keyType)}
        onChange={event => onChangeType(event)}
      />
      <label className={style.typeItem} htmlFor={`type${id}`}>
        <img className={style.typeImg} src={imgTypeList[keyType]} alt={nameType} />
        <span>{nameType}</span>
      </label>
    </li>
  );
}
