import React from 'react';
import hooks from '../../customHooks';
import { LanguageContext, InformationContext } from '../../context';
import style from './App.css';
import Header from '../Header';
import NationsList from '../NationsList';
import TypesList from '../TypesList';
import VehicleInfo from '../VehicleInfo';
import VehicleList from '../VehicleList';
import InfoWrap from '../InfoWrap';
import Footer from '../Footer';

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
    refMobileView,
  } = useGeneraData(selectedLanguage);
  const {
    isSearchLoading,
    errorSearch,
    searchData,
    onClickVehicle,
    vehicleId,
    toggleModalVehicle,
    compareList,
    setCompareList,
    refInfoModule,
  } = useSearchData(selectedLanguage, selectNation, selectType);

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
      <Header />
      <main>
        <div className={style.infoWrap}>
          <InformationContext.Provider
            value={{ ...useUserData(), ...useCompareData(compareList, setCompareList) }}
          >
            <InfoWrap />
          </InformationContext.Provider>
        </div>
        <div className={style.mainWrap}>
          <div className={style.filterWrap}>
            <div className={style.filterWrapInner} ref={refMobileView}>
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
            </div>
            <button
              className={style.filterBtn}
              onClick={event => toggleFilteWrap(style.filterShow)}
            />
          </div>
          <VehicleList
            errorSearch={errorSearch}
            isSearchLoading={isSearchLoading}
            searchData={searchData}
            onClickVehicle={onClickVehicle}
            selectNation={selectNation}
            selectType={selectType}
            refInfoModule={refInfoModule}
          />
        </div>
        <VehicleInfo
          vehicleId={vehicleId}
          vehicle={searchData[vehicleId]}
          toggleModalVehicle={toggleModalVehicle}
          refInfoModule={refInfoModule}
        />
      </main>
      <Footer />
    </LanguageContext.Provider>
  );
}
