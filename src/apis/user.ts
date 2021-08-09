import http from "./_request";

/**
 * 获取当前用户信息
 */
export const getUser = () => http.get("/user");
