const romeNumbers = {
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

export const getRomeNumber = num => romeNumbers[num];

export const getDateFromUnixTimestamp = dt => new Date(dt * 1000).toLocaleDateString();

export const isFunction = func => typeof func === 'function';

export const isEmptyObject = obj => Object.entries(obj).length !== 0;
