import dataStore from './data/dataStore';
import { performSearch } from './data/tanksData';
import renderApp from './framework/render';
import Header from './components/Header';
import App from './components/App';
import Footer from './components/Footer';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = dataStore;
window.performSearch = performSearch;

const { cache, path, param } = dataStore.init;
const headerWrap = document.getElementById('header');
const initWrap = document.getElementById('app-root');
const footerWrap = document.getElementById('footer');

renderApp(Header, headerWrap);
renderApp(Footer, footerWrap);
renderApp(App, initWrap);
performSearch(cache, path, param, renderApp);
