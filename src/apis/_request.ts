import axios, { AxiosRequestConfig } from "axios";
import CONFIG from "@/config/index";
import { getTokenAsync } from "./token";
import { HttpRes } from "./types/http";

function request(config: AxiosRequestConfig) {
  const instance = axios.create({ baseURL: CONFIG.http.baseURL, timeout: 10000, withCredentials: true });
  // 请求拦截器
  instance.interceptors.request.use(
    async config => {
      const token = await getTokenAsync();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      config.headers["Content-Type"] = "application/json";
      config.withCredentials = true;
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );
  // 响应拦截器
  instance.interceptors.response.use(
    response => {
      return response.data;
    },
    err => {
      // todo 处理请求错误
      console.log(err);
      return Promise.reject(err);
    }
  );
  return new Promise<HttpRes>(async resolve => {
    const res = await instance(config);
    resolve(res as unknown as HttpRes);
  });
}
export default {
  get: (url: string, data: any) => request({ url, data, method: "GET" }),
  post: (url: string, data: any) => request({ url, data, method: "POST" }),
  delete: (url: string, data: any) => request({ url, data, method: "DELETE" }),
  put: (url: string, data: any) => request({ url, data, method: "PUT" }),
};
