const dataStore = {
  status: {
    error: null,
    process: false,
  },
  init: {
    cache: 'generalData',
    path: 'encyclopedia/info',
    param: {
      language: 'ru',
    },
  },
  cache: {
    generalData: null,
    searchData: null,
    compareData: null,
    userAccount: null,
    userData: null,
  },
  user: null,
  filters: {},
  vehicle_compare: [],
};

export default dataStore;
