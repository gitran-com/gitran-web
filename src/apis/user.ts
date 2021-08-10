import { UserId } from "@/types/user";
import http from "./_request";

/**
 * 获取当前用户信息
 */
export const getUser = () => http.get("/user");
/**
 * 获取指定id用户信息
 * @param id 用户id
 */
export const getUsers = (id: UserId) => http.get(`/users/${id}`);
