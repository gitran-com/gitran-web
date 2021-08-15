import axios from "axios";
import http from "./_request";
import { LoginInfo, RegisterInfo } from "./types/auth";
import CONFIG from "../config";

/**
 * 用户登录
 */
export const authLogin = (data: LoginInfo) => http.post("/auth/login", data);
/**
 * 用户注册
 */
export const authRegister = (data: RegisterInfo) => http.post("/auth/register", data);
/**
 * 用户第一次使用GitHub登录时设置密码
 * @param password
 * @param token 从cookie里拿一次性token
 */
export const authGithubNew = (password: string, token: string) =>
  axios.post(`${CONFIG.http.baseURL}/auth/github/new`, { password }, { headers: { Authorization: `Bearer ${token}` } });
/**
 * 获取GitHub中的仓库列表
 */
export const authGithubRepo = () => http.get("/auth/github/repos");
