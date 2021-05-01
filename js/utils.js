const parameters = {
  //   application_id: process.env.WOT_API_ID_KEY,
  application_id: '42a820be7f4b3fa53490a3eebeae0521',
};

const getStringParams = params => {
  return Object.entries(params)
    .map((param, key) => {
      return `${param.join('=')}&`;
    })
    .join('');
};

const romeNumber = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII',
  8: 'VIII',
  9: 'IX',
  10: 'X',
};

const sortByTier = (a, b) => a.tier - b.tier;

const filterByType = (list, type) => {
  return Object.values(list).filter(vehicle => vehicle.type == type);
};

const getSortList = list => {
  return Object.values(list).sort((firstVehicle, secondVehicle) => {
    return sortByTier(firstVehicle, secondVehicle);
  });
};

export const getFilterList = list => {
  return {
    lightTank: getSortList(filterByType(list, 'lightTank')),
    mediumTank: getSortList(filterByType(list, 'mediumTank')),
    heavyTank: getSortList(filterByType(list, 'heavyTank')),
    'AT-SPG': getSortList(filterByType(list, 'AT-SPG')),
    SPG: getSortList(filterByType(list, 'SPG')),
  };
};

export const getUrl = (path, param = {}) => {
  let params = { ...parameters, ...param };
  getStringParams(params);
  return `https://api.worldoftanks.ru/wot/encyclopedia/${path}/?${getStringParams(params)}`;
};

export const getRomeNumber = num => {
  return romeNumber[num];
};
