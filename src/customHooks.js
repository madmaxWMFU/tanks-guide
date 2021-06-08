import { useEffect, useState } from 'react';
import { loadData } from './data';

export default function customHook() {
  const [selectLanguage, setLanguage] = useState('ru');
  const [nationData, setNationData] = useState({});
  const [typeData, setTypeData] = useState({});
  const [searchData, setSearchData] = useState({});
  const [userData, setUserData] = useState({});
  const [compareData, setCompareData] = useState({});
  const [selectNation, setSelectNation] = useState([]);
  const [selectType, setSelectType] = useState([]);
  const [vehicleId, setVehicleId] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [userID, setUserID] = useState(null);
  const [modalVehicleStatus, setModalVehicleStatus] = useState(false);
  const [modalCompareStatus, setModalCompareStatus] = useState(false);
  const [modalUserStatus, setModalUserStatus] = useState(false);
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

  const onKeyPress = event => {
    const {
      key,
      target: { value },
    } = event;

    if (key === 'Enter') {
      setNickname(value);
    }
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

  useEffect(() => {
    if (nickname) {
      setIsLoading(true);
      loadData('account/list', { search: nickname })
        .then(data => {
          const {
            message,
            code,
            data: [{ account_id }],
          } = data;

          if (code !== '200' && message) throw Error(message);
          setError(null);
          setUserID(account_id);
        })
        .catch(setError)
        .finally(() => setIsLoading(false));
    }
  }, [nickname]);

  useEffect(() => {
    if (userID) {
      setIsLoading(true);
      loadData('account/info', { account_id: userID })
        .then(data => {
          const { message, code, data: dataList } = data;

          if (code !== '200' && message) throw Error(message);
          setError(null);
          setUserData(dataList);
        })
        .catch(setError)
        .finally(() => setIsLoading(false));
    }
  }, [userID]);

  useEffect(() => {
    if (compareList.length != 0) {
      setIsLoading(true);
      loadData('encyclopedia/vehicles', { tank_id: compareList.join(', ') })
        .then(data => {
          const { message, code, data: dataList } = data;

          if (code !== '200' && message) throw Error(message);
          setError(null);
          setCompareData(dataList);
        })
        .catch(setError)
        .finally(() => setIsLoading(false));
    }
  }, [compareList]);

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
    userData,
    setUserData,
    compareData,
    setCompareData,
    nickname,
    setNickname,
    userID,
    setUserID,
    modalCompareStatus,
    setModalCompareStatus,
    modalUserStatus,
    setModalUserStatus,
    onKeyPress,
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
