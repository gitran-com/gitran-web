const isDev = !import.meta.env.PROD;

const CONFIG = {
  isDev,
  http: {
    baseURL: isDev ? "http://gitran.com:7000/api/v1" : "http://gitran.com:7000/api/v1",
  },
};
export default CONFIG;
