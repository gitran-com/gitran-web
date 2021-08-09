import { setToken, Token } from "@/apis/token";
import { navigateTo } from "./navigateTo";

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
