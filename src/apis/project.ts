import { UserId } from "@/types/user";
import http from "./_request";

/**
 * 获取指定用户项目列表
 * @param id 用户id
 */
export const getUsersProjects = (id: UserId) => http.get(`/users/${id}/projects`);
