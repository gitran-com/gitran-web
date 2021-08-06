import axios from "axios";
import CONFIG from "../config";

const TOKEN_KEY = "Gitran_Token";
export interface Token {
  expire: number;
  refresh: number;
  token: "string";
}

/**
 * 设置本地的token
 * @param token
 */
function setToken(token: Token): void {
  window.localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}

/**
 * 根据本地的旧token换取新token
 * @param oldToken
 */
export function refreshToken(oldToken: string): Promise<string> {
  return new Promise(async resolve => {
    const { data } = await axios.post(`${CONFIG.http.baseURL}/auth/refresh`, null, {
      headers: { Authorization: `Bearer ${oldToken}` },
    });
    const { expires_at: expire, refresh_before: refresh, token } = data;
    resolve(token);
    setToken({ expire, refresh, token });
  });
}

/**
 * 获取本地的token
 */
export function getToken(): Promise<string | null> {
  return new Promise(async resolve => {
    const tokenStr = window.localStorage.getItem(TOKEN_KEY);
    if (!tokenStr) {
      resolve(null);
    } else {
      const tokenObj: Token = JSON.parse(tokenStr);
      const { expire, refresh, token } = tokenObj;
      // token未过期
      if (expire * 1000 < Date.now()) {
        resolve(token);
      }
      // token已过期
      else {
        // 判断是否能刷新
        if (refresh * 1000 < Date.now()) {
          const newToken = await refreshToken(token);
          resolve(newToken);
        } else {
          // todo 重定向至登录页
        }
      }
    }
  });
}
