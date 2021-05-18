import { getTankUrl } from './tanksAPI';
import App from '../components/App';

const sortByTier = (a, b) => a.tier - b.tier;

const filterByType = (list, type) => {
  return Object.values(list).filter(vehicle => vehicle.type == type);
};

const getSortList = list => {
  return Object.values(list).sort((firstVehicle, secondVehicle) => {
    return sortByTier(firstVehicle, secondVehicle);
  });
};

export function getUserData() {
  const { userAccount } = window.dataStore.cache;
  if (userAccount) {
    const [{ account_id: id }] = dataStore.cache.userAccount;
    window.performSearch('userData', 'account/info', { account_id: id }, 'getUserInfo');
  }
}

export function getUserAccountId() {
  const nickname = window.dataStore.user;
  if (nickname) {
    window.performSearch('userAccount', 'account/list', { search: nickname }, 'getUserData');
  }
}

export async function loadData(path, param) {
  const url = getTankUrl(path, param);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export function performSearch(cache, path, param, func) {
  window.dataStore.status.error = null;
  window.dataStore.status.process = true;
  window.renderApp(App, 'app-root');

  window
    .loadData(path, param)
    .then(({ error, data }) => {
      window.dataStore.status.process = false;

      if (error) {
        window.dataStore.status.error = 'error';
      } else if (data) {
        window.dataStore.cache[cache] = data;
      }
    })
    .catch(() => {
      window.dataStore.status.error = 'Some error occurred.';
    })
    .finally(window[func]);
}

export function searchByFilter(vehicle) {
  const cacheType = vehicle.dataset.type;
  const [key, value] = vehicle.dataset.value.split('_');
  window.dataStore.filters[key] = value;
  window.performSearch(
    'searchData',
    'encyclopedia/vehicles',
    window.dataStore.filters,
    'renderApp',
  );
}

export default function getFilterList(list) {
  return {
    lightTank: getSortList(filterByType(list, 'lightTank')),
    mediumTank: getSortList(filterByType(list, 'mediumTank')),
    heavyTank: getSortList(filterByType(list, 'heavyTank')),
    'AT-SPG': getSortList(filterByType(list, 'AT-SPG')),
    SPG: getSortList(filterByType(list, 'SPG')),
  };
}
