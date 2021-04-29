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

export const filterByCategory = (list, category) => {};

export const filterByTier = list => {};

export const getUrl = (path, param = {}) => {
  let params = { ...parameters, ...param };
  getStringParams(params);
  return `https://api.worldoftanks.ru/wot/encyclopedia/${path}/?${getStringParams(params)}`;
};

export const getRomeNumber = num => {
  return romeNumber[num];
};
