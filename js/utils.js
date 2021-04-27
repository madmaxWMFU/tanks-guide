const parameters = {
  application_id: process.env.WOT_API_ID_KEY,
  // application_id: "42a820be7f4b3fa53490a3eebeae0521",
};

const getStringParams = params => {
  return Object.entries(params)
    .map((param, key) => {
      return `${param.join('=')}&`;
    })
    .join('');
};

export const getUrl = (path, param = {}) => {
  let params = { ...parameters, ...param };
  getStringParams(params);
  return `https://api.worldoftanks.ru/wot/encyclopedia/${path}/?${getStringParams(params)}`;
};
