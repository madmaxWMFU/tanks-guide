import React from 'react';
import customHook from '../customHooks';
import { LanguageContext, InformationContext } from '../context';
import Header from './Header';
import GetInfoWrap from './GetInfoWrap';
import GetVehicleNations from './GetVehicleNations';
import GetVehicleTypes from './GetVehicleTypes';
import GetVehicleList from './GetVehicleList';
import GetVehicleInfo from './GetVehicleInfo';
import Footer from './Footer';
import style from './App.css';

export default function App() {
  const {
    selectLanguage,
    setLanguage,
    nationData,
    typeData,
    searchData,
    selectNation,
    selectType,
    vehicleId,
    setVehicleId,
    modalVehicleStatus,
    setModalVehicleStatus,
    error,
    isLoading,
    addToSelectNationList,
    deleteFromSelectNationList,
    addToSelectTypeList,
    deleteFromSelectTypeList,
    addToCompareList,
    compareData,
    modalCompareStatus,
    setCompareList,
    setCompareData,
    setModalCompareStatus,
  } = customHook();

  return (
    <LanguageContext.Provider value={{ selectLanguage, setLanguage }}>
      <Header />
      <main>
        <InformationContext.Provider
          value={{
            compareData,
            modalCompareStatus,
            setCompareList,
            setCompareData,
            setModalCompareStatus,
          }}
        >
          <div className={style.infoWrap}>
            <GetInfoWrap />
          </div>
        </InformationContext.Provider>
        <div className={style.mainWrap}>
          <GetVehicleNations
            error={error}
            nationData={nationData}
            selectNation={selectNation}
            addToSelectNationList={addToSelectNationList}
            deleteFromSelectNationList={deleteFromSelectNationList}
          />
          <GetVehicleTypes
            error={error}
            typeData={typeData}
            selectType={selectType}
            addToSelectTypeList={addToSelectTypeList}
            deleteFromSelectTypeList={deleteFromSelectTypeList}
          />
          <GetVehicleList
            error={error}
            isLoading={isLoading}
            searchData={searchData}
            setVehicleId={setVehicleId}
            setModalVehicleStatus={setModalVehicleStatus}
          />
        </div>
        <div
          className={`${style.modal} modalVehicle ${modalVehicleStatus ? style.modalActive : ''}`}
        >
          <GetVehicleInfo
            vehicle={searchData[vehicleId]}
            setVehicleId={setVehicleId}
            setModalVehicleStatus={setModalVehicleStatus}
            vehicleId={vehicleId}
            addToCompareList={addToCompareList}
          />
        </div>
      </main>
      <Footer />
    </LanguageContext.Provider>
  );
}
