import { setToken, Token, TOKEN_KEY, getTokenSync } from "@/apis/token";
import { navigateTo } from "./navigateTo";
import { storage } from "./storage";

/**
 * 第一次登陆时设置本地的token并跳转至之前的页面
 */
interface DataProps extends Token {
  url: string;
}
export function setLoginToken(data: DataProps) {
  const { expiresAt, refreshBefore, token, url } = data;
  setToken({ expiresAt, refreshBefore, token });
  navigateTo(url ? url : "/");
}

export function logout() {
  storage.remove(TOKEN_KEY);
}
export function isLogin(): boolean {
  return getTokenSync() ? true : false;
}
