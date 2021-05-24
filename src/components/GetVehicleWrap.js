/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import GetVehicleList from './GetVehicleList';
import { getVehicleInfo as GetVehicleInfo } from './GetVehicleInfo';
import { vehicleWrap, modal, modalActive } from './GetVehicleWrap.css';

export default function GetVehicleWrap() {
  const { name, state } = window.dataStore.modal;

  return (
    <>
      <div class={vehicleWrap}>
        <GetVehicleList />
      </div>
      <div class={`${modal} modalVehicle ${state && name === 'modalVehicle' ? modalActive : ''}`}>
        <GetVehicleInfo />
      </div>
    </>
  );
}
