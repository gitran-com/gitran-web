import React, { lazy, useEffect, useState } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { ProjectInfo, ProjectRole } from "@/types/index";
import { getProjectInfo } from "@/apis/index";
import ProjectTab from "./ProjectTab";
import ProjectOverview from "./ProjectOverview";
const ProjectSettings = lazy(() => import("./ProjectSettings"));
const ProjectSource = lazy(() => import("./ProjectSource"));
const ProjectMembers = lazy(() => import("./ProjectMembers"));

export default function Project() {
  const { uri } = useRouteMatch().params as { uri: string };
  const [project, setProject] = useState<ProjectInfo | null>(null);
  const [role, setRole] = useState<ProjectRole>(ProjectRole.None);
  console.log(project);
  useEffect(() => {
    initProject();
  }, []);
  /**
   * 初始化项目列表
   */
  const initProject = async () => {
    const { data } = await getProjectInfo(uri);
    setProject(data.proj as ProjectInfo);
    setRole(data.role as ProjectRole);
  };
  return (
    <div className="project">
      <div className="project-title">{project?.name}</div>
      {/* tab选择栏 */}
      <ProjectTab role={role} uri={uri} />
      {/* <Route path="/project/:uri/:lang" component={Project} />
      <Route path="/project/:uri/:lang/:file/translate" component={Project} /> */}
      <Route path="/project/:uri" render={() => <ProjectOverview project={project} />} exact />
      <Route path="/project/:uri/overview" render={() => <ProjectOverview project={project} />} />
      <Route path="/project/:uri/settings" component={ProjectSettings} />
      <Route path="/project/:uri/source" component={ProjectSource} />
      <Route path="/project/:uri/members" component={ProjectMembers} />
    </div>
  );
}
