const parameters = {
  application_id: process.env.WOT_API_ID_KEY,
};

const getStringParams = params => {
  return Object.entries(params)
    .map((param, key) => {
      return `${param.join('=')}&`;
    })
    .join('');
};

export const getTankUrl = (path, param = {}) => {
  let params = { ...parameters, ...param };
  getStringParams(params);
  return `https://api.worldoftanks.ru/wot/${path}/?${getStringParams(params)}`;
};
