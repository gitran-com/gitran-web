import axios from "axios";
import CONFIG from "@/config/index";
import { getToken } from "@/apis/index";

export interface HttpRes {
  success: boolean;
  code: number;
  message: string;
  data: any;
}

const instance = axios.create({ baseURL: CONFIG.http.baseURL, timeout: 10000 });
// 请求拦截器
instance.interceptors.request.use(
  async config => {
    const token = await getToken();
    config.headers.Authrization = `Bearer ${token}`;
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
// 响应拦截器
instance.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    // todo 处理请求错误
    console.log(err);
    return Promise.reject(err);
  }
);

export default instance;
