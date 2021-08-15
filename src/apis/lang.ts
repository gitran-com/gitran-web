import http from "./_request";

/**
 * 获取语言列表
 */
export const getLanguages = () => http.get(`/languages`);
