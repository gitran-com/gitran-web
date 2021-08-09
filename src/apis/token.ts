import axios from "axios";
import CONFIG from "../config";
import { navigateTo, storage } from "@/utils/index";

export const TOKEN_KEY = "Gitran_Token";
export interface Token {
  expiresAt: number;
  refreshBefore: number;
  token: string;
}

/**
 * 设置本地的token
 * @param token
 */
export function setToken(token: Token) {
  storage.set(TOKEN_KEY, JSON.stringify(token));
}
/**
 * 删除本地token
 */
function clearToken() {
  storage.remove(TOKEN_KEY);
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
    const { expires_at: expiresAt, refresh_before: refreshBefore, token } = data;
    resolve(token);
    setToken({ expiresAt, refreshBefore, token });
  });
}

/**
 * 异步获取本地的token 如果过期则刷新
 */
export function getTokenAsync(): Promise<string | null> {
  return new Promise(async (resolve, reject) => {
    const tokenStr = storage.get(TOKEN_KEY);
    if (!tokenStr) {
      resolve(null);
    } else {
      const tokenObj: Token = JSON.parse(tokenStr);
      const { expiresAt, refreshBefore, token } = tokenObj;
      // token未过期
      if (expiresAt * 1000 > Date.now()) {
        resolve(token);
      }
      // token已过期
      else {
        // 判断是否能刷新
        if (refreshBefore * 1000 > Date.now()) {
          const newToken = await refreshToken(token);
          resolve(newToken);
        } else {
          navigateTo("/login");
          clearToken();
          reject("请重新登录");
        }
      }
    }
  });
}
/**
 * 同步获取本地token
 */
export function getTokenSync(): string | null {
  return storage.get(TOKEN_KEY);
}
