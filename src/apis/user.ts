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

/**
 * 获取当前用户的项目列表
 */
export const getUserProject = () => http.get("/user/projects");

/**
 * 更新当前用户的个人信息
 * @param name
 * @param bio
 */
export const putUser = (name: string, bio: string) => http.put("/user", { name, bio });
