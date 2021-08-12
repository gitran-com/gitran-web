import React, { useState, useEffect } from "react";
import { getUserProject } from "@/apis/index";
import { ProjectInfo } from "@/types/project";
import { langToFlag, Lang } from "@/utils/index";
import { GearIcon } from "@primer/octicons-react";

export default function Content() {
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  useEffect(() => {
    initProjectList();
  }, []);
  const initProjectList = async () => {
    const { data } = await getUserProject();
    const { projs }: { projs: ProjectInfo[] | null } = data;
    if (projs) {
      setProjects(projs);
    }
  };
  return (
    <div className="profile-content">
      <div className="projects">
        {projects.map(proj => {
          return (
            <div key={proj.id} className="projects-item">
              <div className="projects-item-left">
                <div className="projects-item-name">{proj.name}</div>
                <div className="projects-item-flags">
                  {proj.srcLangs.map(src => (
                    <img key={src.code} className="projects-item-flag" src={langToFlag(src.code as Lang)} />
                  ))}
                  <span>→</span>
                  {proj.trnLangs.map(src => (
                    <img key={src.code} className="projects-item-flag" src={langToFlag(src.code as Lang)} />
                  ))}
                </div>
              </div>
              <div className="projects-item-right">
                <GearIcon size={20} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
