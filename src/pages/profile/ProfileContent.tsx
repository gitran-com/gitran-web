import React, { useState, useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { GearIcon } from "@primer/octicons-react";
import { getUserProject, getUsersProjects } from "@/apis/index";
import { UserId, LangCode, ProjectInfo } from "@/types/index";
import { langToFlag } from "@/utils/index";

export default function Content() {
  const { userId } = useRouteMatch().params as { userId: UserId };
  const isMe: boolean = window.location.pathname === "/me";
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  useEffect(() => {
    initProjectList();
  }, []);
  const initProjectList = async () => {
    const { data } = await (isMe ? getUserProject() : getUsersProjects(userId));
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
                <Link className="projects-item-name" to={`project/${proj.uri}`}>
                  {proj.name}
                </Link>
                <div className="projects-item-flags">
                  {proj.srcLangs.map(src => (
                    <img key={src.code} className="projects-item-flag" src={langToFlag(src.code as LangCode)} />
                  ))}
                  <span>→</span>
                  {proj.trnLangs.map(trn => (
                    <img key={trn.code} className="projects-item-flag" src={langToFlag(trn.code as LangCode)} />
                  ))}
                </div>
              </div>
              <div className="projects-item-right">{isMe && <GearIcon size={20} />}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
