import React from 'react';
import { filterInput, filterItem, filterImgNation, filterImgType } from './FilterItem.css';

export default function TypesListItem({
  type,
  imgList,
  keyFilter,
  nameFilter,
  selectData,
  handelChange,
}) {
  const imgStyle = type === 'nation' ? filterImgNation : filterImgType;

  return (
    <li>
      <input
        className={filterInput}
        id={`filter${keyFilter}`}
        type="checkbox"
        data-value={keyFilter}
        checked={selectData.includes(keyFilter)}
        onChange={event => handelChange(event.target.dataset.value)}
      />
      <label className={filterItem} htmlFor={`filter${keyFilter}`}>
        <img className={imgStyle} src={imgList[keyFilter]} alt={nameFilter} />
        <span>{nameFilter}</span>
      </label>
    </li>
  );
}
