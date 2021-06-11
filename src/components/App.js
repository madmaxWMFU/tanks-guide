import React from 'react';
import customHook from '../customHooks';
import { LanguageContext, InformationContext } from '../context';
import Header from './Header';
import InfoWrap from './InfoWrap';
import NationsList from './NationsList';
import TypesList from './TypesList';
import VehicleList from './VehicleList';
import VehicleInfo from './VehicleInfo';
import Footer from './Footer';
import style from './App.css';

export default function App() {
  const {
    selectLanguage,
    setLanguage,
    errorGeneral,
    selectNation,
    nationData,
    onChangeNation,
    selectType,
    typeData,
    onChangeType,
    isSearchLoading,
    errorSearch,
    searchData,
    vehicleId,
    modalVehicleStatus,
    onClickVehicle,
    isUserLoading,
    errorUser,
    userData,
    modalUserStatus,
    setModalUserStatus,
    searchUser,
    toggleUserInfoModule,
    isCompareLoading,
    errorCompare,
    compareData,
    setCompareData,
    setCompareList,
    modalCompareStatus,
    setModalCompareStatus,
    afterCloseModalVehicle,
  } = customHook();

  return (
    <LanguageContext.Provider value={{ selectLanguage, setLanguage }}>
      <Header />
      <main>
        <div className={style.infoWrap}>
          <InformationContext.Provider
            value={{
              isUserLoading,
              errorUser,
              userData,
              modalUserStatus,
              setModalUserStatus,
              setModalCompareStatus,
              searchUser,
              toggleUserInfoModule,
              isCompareLoading,
              errorCompare,
              compareData,
              setCompareData,
              setCompareList,
              modalCompareStatus,
            }}
          >
            <InfoWrap />
          </InformationContext.Provider>
        </div>
        <div className={style.mainWrap}>
          <NationsList
            errorGeneral={errorGeneral}
            nationData={nationData}
            selectNation={selectNation}
            onChangeNation={onChangeNation}
          />
          <TypesList
            errorGeneral={errorGeneral}
            typeData={typeData}
            selectType={selectType}
            onChangeType={onChangeType}
          />
          <VehicleList
            errorSearch={errorSearch}
            isSearchLoading={isSearchLoading}
            searchData={searchData}
            onClickVehicle={onClickVehicle}
          />
        </div>
        <VehicleInfo
          modalVehicleStatus={modalVehicleStatus}
          vehicleId={vehicleId}
          vehicle={searchData[vehicleId]}
          afterCloseModalVehicle={afterCloseModalVehicle}
        />
      </main>
      <Footer />
    </LanguageContext.Provider>
  );
}
