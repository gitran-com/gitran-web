import { UserId } from "./user";

export type ProjectId = number;
export type LanguageId = number;
export interface ProjectLang {
  id: LanguageId;
  code: string;
  iso: string;
  name: string;
}
export interface ProjectInfo {
  id: ProjectId;
  name: string;
  ownerId: UserId;
  srcLangs: ProjectLang[];
  trnLangs: ProjectLang[];
  updatedAt: string;
  [key: string]: any;
}
