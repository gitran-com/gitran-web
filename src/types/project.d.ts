import { Lang } from "./language";
import { UserId } from "./user";

export type ProjectId = number;

export interface ProjectInfo {
  id: ProjectId;
  name: string;
  ownerId: UserId;
  srcLangs: Lang[];
  trnLangs: Lang[];
  updatedAt: string;
  [key: string]: any;
}
