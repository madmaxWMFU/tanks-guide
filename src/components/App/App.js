import React from 'react';
import hooks from '../../customHooks';
import { LanguageContext, InformationContext } from '../../context';
import Header from '../Header';
import InfoWrap from '../InfoWrap';
// import AccountInformation from '../AccountInformation';
import NationsList from '../NationsList';
import TypesList from '../TypesList';
import VehicleList from '../VehicleList';
import VehicleInfo from '../VehicleInfo';
import Footer from '../Footer';
import style from './App.css';

export default function App() {
  const { useLanguage, useGeneraData, useSearchData, useUserData, useCompareData } = hooks;
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const {
    errorGeneral,
    nationData,
    selectNation,
    onChangeNation,
    typeData,
    selectType,
    onChangeType,
    toggleFilteWrap,
  } = useGeneraData(selectedLanguage);
  const {
    setModalCompareStatus,
    isCompareLoading,
    errorCompare,
    compareData,
    setCompareData,
    compareList,
    setCompareList,
    modalCompareStatus,
  } = useCompareData();
  const {
    errorSearch,
    isSearchLoading,
    searchData,
    onClickVehicle,
    modalVehicleStatus,
    vehicleId,
    afterCloseModalVehicle,
  } = useSearchData(selectedLanguage, selectNation, selectType, compareList, setCompareList);

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
      <Header />
      <main>
        <div className={style.infoWrap}>
          <InformationContext.Provider value={{ ...useUserData(), ...useCompareData() }}>
            <InfoWrap />
          </InformationContext.Provider>
        </div>
        <div className={style.mainWrap}>
          <div className={style.filterWrap}>
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
            <button
              className={style.filterBtn}
              onClick={event => toggleFilteWrap(event, style.filterShow)}
            />
          </div>
          <VehicleList
            errorSearch={errorSearch}
            isSearchLoading={isSearchLoading}
            searchData={searchData}
            onClickVehicle={onClickVehicle}
            selectNation={selectNation}
            selectType={selectType}
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
