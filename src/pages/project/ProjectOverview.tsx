import React from "react";
import { ProjectInfo } from "@/types/project";
import { langToFlag } from "@/utils/langToFlag";
import { LinearProgress } from "@material-ui/core";

export default function ProjectOverview({ project }: { project: ProjectInfo | null }) {
  return (
    <div className="project-overview">
      <div className="card-wrapper">
        {project?.trnLangs.map((lang, index) => (
          <div className="card" key={lang.code}>
            <div className="header">
              <img src={langToFlag(lang.code, "round")} />
              <div className="update">updated at 2021/10/27</div>
            </div>
            <div className="name">{lang.name}</div>
            <div className="iso">{lang.iso}</div>
            <div className="progress">
              <LinearProgress value={index * 10} variant="determinate" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
