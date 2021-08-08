import { setToken } from "@/apis/token";

/**
 * 初次登陆时设置本地的token并跳转回登陆前的页面
 */
export function setLoginToken(data: { expires_at: number; refresh_before: number; token: string; url: string }) {
  console.log(data, "--------------");
  const { expires_at: expire, refresh_before: refresh, token, url } = data;
  setToken({ expire, refresh, token });
  window.location.href = url ? url : "/";
}
