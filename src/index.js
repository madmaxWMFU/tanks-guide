import dataStore from './data/dataStore';
import {
  loadData,
  performSearch,
  searchByFilter,
  getUserData,
  getUserAccountId,
} from './data/tanksData';
import getVehicleInfo from './components/GetVehicleInfo';
import GetInfoUser from './components/GetInfoUser';
import GetCompareList from './components/GetCompareList';
import { closeModal } from './utils';
import renderApp from './framework/render';
import App from './components/App';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = dataStore;
window.renderApp = renderApp;
window.loadData = loadData;
window.performSearch = performSearch;
window.searchByFilter = searchByFilter;
window.getVehicleInfo = getVehicleInfo;
window.getCompareList = GetCompareList;
window.getUserInfo = GetInfoUser;
window.getUserData = getUserData;
window.getUserAccountId = getUserAccountId;
window.closeModal = closeModal;

const { cache, path, param } = dataStore.init;
performSearch(cache, path, param, 'renderApp');
renderApp(App, 'app-root');
