/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import languageList from '../data/languageList';
import GetVehicleNations from './GetVehicleNations';
import GetVehicleTypes from './GetVehicleTypes';
import GetVehicleWrap from './GetVehicleWrap';
import { nationWrap, nationTitle, typeWrap, typeTitle } from './GetFilterWrap.css';

export default function GetFilterWrap() {
  const { language } = window.dataStore.init.param;
  const { nation, type } = languageList[language];

  return (
    <>
      <div class={nationWrap}>
        <h2 class={nationTitle}>{nation}</h2>
        <GetVehicleNations />
      </div>
      <div class={typeWrap}>
        <h2 class={typeTitle}>{type}</h2>
        <GetVehicleTypes />
      </div>
      <GetVehicleWrap />
    </>
  );
}
