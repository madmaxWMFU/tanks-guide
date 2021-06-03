/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment, useState, useEffect } from '../framework';
import { loadData, languageList } from '../data';
import GetVehicleNations from './GetVehicleNations';
import GetVehicleTypes from './GetVehicleTypes';
import GetVehicleList from './GetVehicleList';
import GetVehicleInfo from './GetVehicleInfo';
import {
  nationWrap,
  nationTitle,
  typeWrap,
  typeTitle,
  vehicleWrap,
  modal,
  modalActive,
} from './GetFilterWrap.css';

export default function GetFilterWrap({ selectLanguage, addToCompareList }) {
  const { nation, type } = languageList[selectLanguage];
  const parameter = { language: selectLanguage };

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [generalData, setGeneralData] = useState({});
  const [selectNation, setSelectNation] = useState([]);
  const [selectType, setSelectType] = useState([]);
  const [searchData, setSearchData] = useState({});
  const [vehicleId, setVehicleId] = useState(null);
  const [modalVehicleStatus, setModalVehicleStatus] = useState(false);
  const addToSelectNationList = id => {
    setSelectNation([...selectNation, id]);
  };
  const deleteFromSelectNationList = id => {
    if (selectNation.includes(id)) {
      const index = selectNation.indexOf(id);
      setSelectNation([...selectNation.splice(index, 1), ...selectNation]);
    }
  };
  const addToSelectTypeList = id => {
    setSelectType([...selectType, id]);
  };

  useEffect(() => {
    loadData('encyclopedia/info', parameter)
      .then(data => {
        const { message, code, data: dataList } = data;

        if (code !== '200' && message) throw Error(message);
        setError(null);
        setSelectNation([]);
        setSelectType([]);
        setSearchData({});
        setGeneralData(dataList);
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [selectLanguage]);

  useEffect(() => {
    if (selectNation.length !== 0 || selectType.length !== 0) {
      loadData('encyclopedia/vehicles', {
        ...parameter,
        ...{ nation: selectNation.join(', ') },
        ...{ type: selectType.join(', ') },
      })
        .then(data => {
          const { message, code, data: dataList } = data;

          if (code !== '200' && message) throw Error(message);
          setError(null);
          setSearchData(dataList);
        })
        .catch(setError)
        .finally(() => setIsLoading(false));
    }
  }, [selectNation, selectType]);

  return (
    <>
      <div class={nationWrap}>
        <h2 class={nationTitle}>{nation}</h2>
        <GetVehicleNations
          selectNation={selectNation}
          nationsList={generalData['vehicle_nations']}
          addToSelectNationList={addToSelectNationList}
          deleteFromSelectNationList={deleteFromSelectNationList}
        />
      </div>
      <div class={typeWrap}>
        <h2 class={typeTitle}>{type}</h2>
        <GetVehicleTypes
          selectType={selectType}
          vehicleTypes={generalData['vehicle_types']}
          addToSelectTypeList={addToSelectTypeList}
        />
      </div>
      <div class={vehicleWrap}>
        <GetVehicleList
          selectLanguage={selectLanguage}
          searchData={searchData}
          setVehicleId={setVehicleId}
          setModalVehicleStatus={setModalVehicleStatus}
        />
      </div>
      <div class={`${modal} modalVehicle ${modalVehicleStatus ? modalActive : ''}`}>
        <GetVehicleInfo
          selectLanguage={selectLanguage}
          vehicle={searchData[vehicleId]}
          setVehicleId={setVehicleId}
          setModalVehicleStatus={setModalVehicleStatus}
          vehicleId={vehicleId}
          addToCompareList={addToCompareList}
        />
      </div>
    </>
  );
}
