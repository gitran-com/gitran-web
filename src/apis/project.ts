import { LangCode } from "@/types/language";
import { UserId } from "@/types/user";
import http from "./_request";

/**
 * 获取指定用户项目列表
 * @param id 用户id
 */
export const getUsersProjects = (id: UserId) => http.get(`/users/${id}/projects`);
/**
 * 新建项目时判断项目地址是否存在
 * @param uri
 */
export const getProjectExist = (name: string) => http.get(`/projects/${name}/existed`);
/**
 * 新建新项目
 * @param name
 * @param uri
 * @param desc
 * @param git_url
 * @param src_langs
 * @param trn_langs
 * @param type
 */
export const postNewProject = (
  type: number,
  name: string,
  uri: string,
  desc: string,
  git_url: string,
  src_langs: LangCode[],
  trn_langs: LangCode[],
  access_token?: string
) => http.post("/projects", { type, name, uri, desc, git_url, src_langs, trn_langs, access_token });
