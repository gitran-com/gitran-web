import { Lang } from "./language";
import { UserId } from "./user";

export type ProjectId = number;
export enum ProjectStatus {
  // 已创建但未初始化
  Created,
  // 初始化完成
  Initialized,
  // 创建失败
  Failed = -1,
}
export enum ProjectType {
  // 从GitHub导入的仓库
  GitHub,
  // 从GitURL导入的仓库
  Git,
  // 新建空仓库
  Empty,
}

export interface BasicProjectInfo {
  id: ProjectId;
  name: string;
  ownerId: UserId;
  srcLangs: Lang[];
  trnLangs: Lang[];
  updatedAt: string;
  [key: string]: any;
}
export interface ProjectInfo extends BasicProjectInfo {
  status: ProjectStatus;
  type: ProjectType;
  createdAt: string;
  gitUrl: string;
  publicContribute: boolean;
  publicView: boolean;
  uri: string;
  errorMessage?: string;
  [key: string]: any;
}

export enum ProjectRole {
  Admin,
  Committer,
  Contributor,
  Viewer,
  None = 127,
}
