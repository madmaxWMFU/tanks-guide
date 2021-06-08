import { getTankUrl } from './tanksAPI';

const sortByTier = (a, b) => a.tier - b.tier;

const filterByType = (list, type) => {
  return Object.values(list).filter(vehicle => vehicle.type == type);
};

const getSortList = list => {
  return Object.values(list).sort((firstVehicle, secondVehicle) => {
    return sortByTier(firstVehicle, secondVehicle);
  });
};

export function getFilterList(list) {
  return {
    lightTank: getSortList(filterByType(list, 'lightTank')),
    mediumTank: getSortList(filterByType(list, 'mediumTank')),
    heavyTank: getSortList(filterByType(list, 'heavyTank')),
    'AT-SPG': getSortList(filterByType(list, 'AT-SPG')),
    SPG: getSortList(filterByType(list, 'SPG')),
  };
}

export async function loadData(path, param) {
  const url = getTankUrl(path, param);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
