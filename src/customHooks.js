import { useEffect, useState } from 'react';
import { loadData } from './data';

export default function customHook() {
  const [selectLanguage, setLanguage] = useState('ru');

  const [isGeneralLoading, setGeneralLoading] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState(null);
  const [selectNation, setSelectNation] = useState([]);
  const [nationData, setNationData] = useState({});
  const [selectType, setSelectType] = useState([]);
  const [typeData, setTypeData] = useState({});

  const [isSearchLoading, setSearchLoading] = useState(false);
  const [errorSearch, setErrorSearch] = useState(null);
  const [searchData, setSearchData] = useState({});
  const [vehicleId, setVehicleId] = useState(null);
  const [modalVehicleStatus, setModalVehicleStatus] = useState(false);

  const [isUserLoading, setUserLoading] = useState(false);
  const [errorUser, setErrorUser] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userData, setUserData] = useState({});
  const [modalUserStatus, setModalUserStatus] = useState(false);

  const [isCompareLoading, setCompareLoading] = useState(false);
  const [errorCompare, setErrorCompare] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [compareData, setCompareData] = useState({});
  const [modalCompareStatus, setModalCompareStatus] = useState(false);

  const addToSelectNationList = id => {
    setSelectNation([...selectNation, id]);
  };

  const deleteFromSelectNationList = id => {
    const nations = selectNation.filter(el => el !== id);
    setSelectNation(nations);
  };

  const onChangeNation = event => {
    const nationValue = event.target.dataset.value;
    if (selectNation.includes(nationValue)) {
      deleteFromSelectNationList(nationValue);
    } else {
      addToSelectNationList(nationValue);
    }
  };

  const addToSelectTypeList = id => {
    setSelectType([...selectType, id]);
  };

  const deleteFromSelectTypeList = id => {
    const type = selectType.filter(el => el !== id);
    setSelectType(type);
  };

  const onChangeType = event => {
    const typeValue = event.target.dataset.value;
    if (selectType.includes(typeValue)) {
      deleteFromSelectTypeList(typeValue);
    } else {
      addToSelectTypeList(typeValue);
    }
  };

  const onClickVehicle = event => {
    setVehicleId(event.target.dataset.id);
    setModalVehicleStatus(true);
  };

  const searchUser = event => {
    const {
      key,
      target: { value },
    } = event;

    if (key === 'Enter') {
      setNickname(value);
      event.target.value = '';
    }
  };

  const addToCompareList = id => {
    if (id) {
      setCompareList([...compareList, id]);
    }
  };

  const afterCloseModalVehicle = id => {
    setVehicleId(null);
    setModalVehicleStatus(false);
    addToCompareList(id);
  };

  const toggleUserInfoModule = () => {
    if (modalUserStatus) {
      setModalUserStatus(false);
      setNickname(null);
      setUserID(null);
      setUserData({});
    } else {
      setModalUserStatus(true);
    }
  };

  useEffect(() => {
    setGeneralLoading(true);
    loadData('encyclopedia/info', { language: selectLanguage })
      .then(data => {
        const {
          message,
          code,
          data: { vehicle_nations: nations, vehicle_types: types },
        } = data;

        if (code !== '200' && message) throw Error(message);
        setErrorGeneral(null);
        setNationData(nations);
        setTypeData(types);
      })
      .catch(setErrorGeneral)
      .finally(() => setGeneralLoading(false));
  }, [selectLanguage]);

  useEffect(() => {
    setSearchLoading(true);
    if (selectNation.length !== 0 || selectType.length !== 0) {
      loadData('encyclopedia/vehicles', {
        ...{ language: selectLanguage },
        ...{ nation: selectNation.join(', ') },
        ...{ type: selectType.join(', ') },
      })
        .then(data => {
          const { message, code, data: dataList } = data;

          if (code !== '200' && message) throw Error(message);
          setErrorSearch(null);
          setSearchData(dataList);
        })
        .catch(setErrorSearch)
        .finally(() => setSearchLoading(false));
    } else {
      setSearchData({});
    }
  }, [selectLanguage, selectNation, selectType]);

  useEffect(() => {
    if (nickname) {
      setUserLoading(true);
      loadData('account/list', { search: nickname })
        .then(data => {
          const {
            message,
            code,
            data: [{ account_id }],
          } = data;

          if (code !== '200' && message) throw Error(message);
          setErrorUser(null);
          setUserID(account_id);
        })
        .catch(setErrorUser)
        .finally(() => setUserLoading(false));
    }
  }, [nickname]);

  useEffect(() => {
    if (userID) {
      setUserLoading(true);
      loadData('account/info', { account_id: userID })
        .then(data => {
          const { message, code, data: dataList } = data;

          if (code !== '200' && message) throw Error(message);
          setErrorUser(null);
          setUserData(dataList);
        })
        .catch(setErrorUser)
        .finally(() => setUserLoading(false));
    }
  }, [userID]);

  useEffect(() => {
    if (compareList.length != 0) {
      setCompareLoading(true);
      loadData('encyclopedia/vehicles', { tank_id: compareList.join(', ') })
        .then(data => {
          const { message, code, data: dataList } = data;

          if (code !== '200' && message) throw Error(message);
          setErrorCompare(null);
          setCompareData(dataList);
        })
        .catch(setErrorCompare)
        .finally(() => setCompareLoading(false));
    }
  }, [compareList]);

  return {
    selectLanguage,
    setLanguage,
    isGeneralLoading,
    errorGeneral,
    selectNation,
    setSelectNation,
    nationData,
    setNationData,
    onChangeNation,
    selectType,
    setSelectType,
    typeData,
    setTypeData,
    onChangeType,
    isSearchLoading,
    errorSearch,
    searchData,
    setSearchData,
    vehicleId,
    modalVehicleStatus,
    setModalVehicleStatus,
    onClickVehicle,
    isUserLoading,
    errorUser,
    nickname,
    setNickname,
    userData,
    setUserData,
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
  };
}
