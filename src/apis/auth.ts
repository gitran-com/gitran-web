import http from "./_request";
import { LoginInfo, RegisterInfo } from "./types/auth";

export const login = (data: LoginInfo) => http.post("/auth/login", data);
export const authRegister = (data: RegisterInfo) => http.post("/auth/register", data);
