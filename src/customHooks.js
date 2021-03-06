import { useEffect, useState, useRef } from 'react';
import { loadData } from './data';
const camelize = require('camelize');

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
  const refMobileView = useRef(null);

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

  const toggleFilteWrap = styleRule => refMobileView.current.classList.toggle(styleRule);

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
    errorGeneral,
    selectNation,
    nationData,
    onChangeNation,
    selectType,
    typeData,
    onChangeType,
    toggleFilteWrap,
    refMobileView,
  };
}

function useSearchData(selectedLanguage, selectNation, selectType) {
  const [isSearchLoading, setSearchLoading] = useState(false);
  const [errorSearch, setErrorSearch] = useState(null);
  const [searchData, setSearchData] = useState({});
  const [compareList, setCompareList] = useState([]);
  const [vehicleId, setVehicleId] = useState(null);
  const refInfoModule = useRef(null);

  const onClickVehicle = (event, styleRule) => {
    setVehicleId(event.target.dataset.id);
    refInfoModule.current.classList.add(styleRule);
  };

  const toggleModalVehicle = (styleRule, id = null) => {
    const moduleClassList = Object.values(refInfoModule.current.classList);
    const removeStyle = moduleClassList.filter(style =>
      style.includes('modalActive') ? style : null,
    );

    if (removeStyle.length) {
      setVehicleId(null);
      refInfoModule.current.classList.remove(removeStyle);
    } else {
      refInfoModule.current.classList.add(styleRule);
    }

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
          setSearchData(camelize(dataList));
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
    vehicleId,
    onClickVehicle,
    toggleModalVehicle,
    refInfoModule,
    compareList,
    setCompareList,
  };
}

function useUserData() {
  const [isUserLoading, setUserLoading] = useState(false);
  const [errorUser, setErrorUser] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userData, setUserData] = useState({});
  const refAccountModule = useRef(null);

  const searchUser = event => {
    const {
      key,
      target: { value },
    } = event;

    if (key === 'Enter') {
      setNickname(value);
      setUserData({});
      event.target.value = '';
    }
  };

  const toggleAccountModule = styleRule => {
    const moduleClassList = Object.values(refAccountModule.current.classList);
    if (moduleClassList.includes(styleRule)) {
      refAccountModule.current.classList.remove(styleRule);
      setNickname(null);
      setUserID(null);
      setUserData({});
    } else {
      refAccountModule.current.classList.add(styleRule);
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
          setUserData(camelize(dataList));
        })
        .catch(setErrorUser)
        .finally(() => setUserLoading(false));
    }
  }, [userID]);

  return {
    isUserLoading,
    errorUser,
    nickname,
    userData,
    searchUser,
    toggleAccountModule,
    refAccountModule,
  };
}

function useCompareData(compareList, setCompareList) {
  const [isCompareLoading, setCompareLoading] = useState(false);
  const [errorCompare, setErrorCompare] = useState(null);
  const [compareData, setCompareData] = useState({});
  const refCompareModule = useRef(null);

  const toggleCompareModule = (styleRule, clear = null) => {
    const moduleClassList = Object.values(refCompareModule.current.classList);
    const removeStyle = moduleClassList.filter(style =>
      style.includes('modalActive') ? style : null,
    );

    if (removeStyle.length) {
      refCompareModule.current.classList.remove(removeStyle);
    } else {
      refCompareModule.current.classList.add(styleRule);
    }

    if (clear) {
      setCompareData({});
      setCompareList([]);
    }
  };

  useEffect(() => {
    if (compareList.length != 0) {
      setCompareLoading(true);
      loadData('encyclopedia/vehicles', { tank_id: compareList.join(', ') })
        .then(data => {
          const { message, code, data: dataList } = data;

          if (code !== '200' && message) throw Error(message);
          setErrorCompare(null);
          setCompareData(camelize(dataList));
        })
        .catch(setErrorCompare)
        .finally(() => setCompareLoading(false));
    }
  }, [compareList]);

  return {
    isCompareLoading,
    errorCompare,
    compareData,
    toggleCompareModule,
    refCompareModule,
  };
}

export default {
  useLanguage,
  useGeneraData,
  useSearchData,
  useUserData,
  useCompareData,
};
