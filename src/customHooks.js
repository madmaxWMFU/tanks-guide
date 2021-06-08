import { useEffect, useState } from 'react';
import { loadData } from './data';

export default function customHook() {
  const [selectLanguage, setLanguage] = useState('ru');
  const [nationData, setNationData] = useState({});
  const [typeData, setTypeData] = useState({});
  const [searchData, setSearchData] = useState({});
  const [selectNation, setSelectNation] = useState([]);
  const [selectType, setSelectType] = useState([]);
  const [vehicleId, setVehicleId] = useState(null);
  const [modalVehicleStatus, setModalVehicleStatus] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addToSelectNationList = id => {
    setSelectNation([...selectNation, id]);
  };

  const deleteFromSelectNationList = id => {
    const nations = selectNation.filter(el => el !== id);
    setSelectNation(nations);
  };

  const addToSelectTypeList = id => {
    setSelectType([...selectType, id]);
  };

  const deleteFromSelectTypeList = id => {
    const type = selectType.filter(el => el !== id);
    setSelectType(type);
  };

  const addToCompareList = id => {
    setCompareList([...compareList, id]);
  };

  useEffect(() => {
    setIsLoading(true);
    loadData('encyclopedia/info', { language: selectLanguage })
      .then(data => {
        const {
          message,
          code,
          data: { vehicle_nations: nations, vehicle_types: types },
        } = data;

        if (code !== '200' && message) throw Error(message);
        setError(null);
        setNationData(nations);
        setTypeData(types);
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [selectLanguage]);

  useEffect(() => {
    setIsLoading(true);
    if (selectNation.length !== 0 || selectType.length !== 0) {
      loadData('encyclopedia/vehicles', {
        ...{ language: selectLanguage },
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
  }, [selectLanguage, selectNation, selectType]);

  return {
    selectLanguage,
    setLanguage,
    nationData,
    setNationData,
    typeData,
    setTypeData,
    searchData,
    setSearchData,
    selectNation,
    setSelectNation,
    selectType,
    setSelectType,
    vehicleId,
    setVehicleId,
    modalVehicleStatus,
    setModalVehicleStatus,
    compareList,
    setCompareList,
    error,
    setError,
    isLoading,
    setIsLoading,
    addToSelectNationList,
    deleteFromSelectNationList,
    addToSelectTypeList,
    deleteFromSelectTypeList,
    addToCompareList,
  };
}
