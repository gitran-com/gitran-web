import http from "./_request";
import { LoginInfo } from "./types/auth";

export function login(data: LoginInfo) {
  return http.post("/auth/login", data);
}
