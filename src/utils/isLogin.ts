import { getTokenSync } from "@/apis/token";

export function isLogin(): boolean {
  return getTokenSync() ? true : false;
}
