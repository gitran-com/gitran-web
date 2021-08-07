const isDev = !import.meta.env.PROD;

const CONFIG = {
  isDev,
  http: {
    baseURL: isDev ? "http://gitran.com:7000/api/v1" : "/api/v1",
  },
  github: {
    loginURL: isDev ? "http://gitran.com:7000/api/v1/auth/github?scope=user" : "/api/v1/auth/github?scope=user",
    repositoryUrl: "https://github.com/gitran-com/gitran-web",
  },
};
export default CONFIG;
