import { useEffect, useState } from 'react';
import { loadData } from './data';

function useLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState('ru');

  return {
    selectedLanguage,
    setSelectedLanguage,
  };
}

function useGeneraData(selectedLanguage) {
  const [isGeneralLoading, setGeneralLoading] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState(null);
  const [selectNation, setSelectNation] = useState([]);
  const [nationData, setNationData] = useState({});
  const [selectType, setSelectType] = useState([]);
  const [typeData, setTypeData] = useState({});

  const onChangeNation = nationValue => {
    if (selectNation.includes(nationValue)) {
      const nation = selectNation.filter(el => el !== nationValue);
      setSelectNation(nation);
    } else {
      setSelectNation([...selectNation, nationValue]);
    }
  };

  const onChangeType = typeValue => {
    if (selectType.includes(typeValue)) {
      const type = selectType.filter(el => el !== typeValue);
      setSelectType(type);
    } else {
      setSelectType([...selectType, typeValue]);
    }
  };

  const toggleFilteWrap = (event, styleRule) => {
    Object.values(event.target.parentNode.childNodes).forEach(item => {
      if (Object.values(item.classList).includes('filter')) {
        item.classList.toggle(styleRule);
      }
    });
  };

  useEffect(() => {
    setGeneralLoading(true);
    loadData('encyclopedia/info', { language: selectedLanguage })
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
  }, [selectedLanguage]);

  return {
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
    toggleFilteWrap,
  };
}

function useSearchData(selectedLanguage, selectNation, selectType, compareList, setCompareList) {
  const [isSearchLoading, setSearchLoading] = useState(false);
  const [errorSearch, setErrorSearch] = useState(null);
  const [searchData, setSearchData] = useState({});
  const [vehicleId, setVehicleId] = useState(null);
  const [modalVehicleStatus, setModalVehicleStatus] = useState(false);

  const onClickVehicle = event => {
    setVehicleId(event.target.dataset.id);
    setModalVehicleStatus(true);
  };

  const afterCloseModalVehicle = id => {
    setVehicleId(null);
    setModalVehicleStatus(false);
    if (id) {
      setCompareList([...compareList, id]);
    }
  };

  useEffect(() => {
    if (selectNation.length !== 0 || selectType.length !== 0) {
      setSearchLoading(true);
      loadData('encyclopedia/vehicles', {
        ...{ language: selectedLanguage },
        ...{ nation: selectNation.join(', ') },
        ...{ type: selectType.join(', ') },
      })
        .then(data => {
          const { message, code, data: dataList } = data;

          if (code !== '200' && message) throw Error(message);
          setSearchData(dataList);
          setErrorSearch(null);
        })
        .catch(setErrorSearch)
        .finally(() => setSearchLoading(false));
    }
  }, [selectedLanguage, selectNation, selectType]);

  return {
    isSearchLoading,
    errorSearch,
    searchData,
    setSearchData,
    vehicleId,
    modalVehicleStatus,
    setModalVehicleStatus,
    onClickVehicle,
    afterCloseModalVehicle,
  };
}

function useUserData() {
  const [isUserLoading, setUserLoading] = useState(false);
  const [errorUser, setErrorUser] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userData, setUserData] = useState({});
  const [modalUserStatus, setModalUserStatus] = useState(false);

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

  return {
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
  };
}

function useCompareData() {
  const [isCompareLoading, setCompareLoading] = useState(false);
  const [errorCompare, setErrorCompare] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [compareData, setCompareData] = useState({});
  const [modalCompareStatus, setModalCompareStatus] = useState(false);

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
    isCompareLoading,
    errorCompare,
    compareData,
    setCompareData,
    compareList,
    setCompareList,
    modalCompareStatus,
    setModalCompareStatus,
  };
}

export default {
  useLanguage,
  useGeneraData,
  useSearchData,
  useUserData,
  useCompareData,
};
