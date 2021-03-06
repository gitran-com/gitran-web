import React, { useState } from "react";
import { EyeIcon, GearIcon, Icon, PeopleIcon, RowsIcon } from "@primer/octicons-react";
import { Tab, Tabs } from "@material-ui/core";
import { ProjectRole } from "@/types/index";
import { Link } from "react-router-dom";

interface MenuItem {
  authorize: ProjectRole[];
  content: string;
  icon: Icon;
  component?: JSX.Element;
}
const menu: MenuItem[] = [
  {
    content: "Overview",
    icon: EyeIcon,
    authorize: [
      ProjectRole.Admin,
      ProjectRole.Committer,
      ProjectRole.Contributor,
      ProjectRole.Viewer,
      ProjectRole.None,
    ],
  },
  {
    content: "Source",
    icon: RowsIcon,
    authorize: [ProjectRole.Admin, ProjectRole.Committer, ProjectRole.Contributor, ProjectRole.Viewer],
  },
  {
    content: "Members",
    icon: PeopleIcon,
    authorize: [ProjectRole.Admin, ProjectRole.Committer, ProjectRole.Contributor, ProjectRole.Viewer],
  },
  {
    content: "Settings",
    icon: GearIcon,
    authorize: [ProjectRole.Admin],
  },
];

export default function ProjectTab({ role, uri }: { role: ProjectRole; uri: string }) {
  const [curMenu, setCurMenu] = useState<number>(0);
  return (
    <div className="project-tab">
      <Tabs
        value={curMenu}
        textColor="primary"
        indicatorColor="primary"
        onChange={(event: React.ChangeEvent<{}>, newValue: number) => {
          setCurMenu(newValue);
        }}
      >
        {menu
          .filter(item => item.authorize.indexOf(role) !== -1)
          .map((item, index) => (
            <Tab
              key={item.content}
              label={
                <Link
                  className={`tab ${index === curMenu ? "cur-tab" : ""}`}
                  to={`/project/${uri}/${menu[index].content.toLowerCase()}`}
                >
                  <item.icon />
                  <span>{item.content}</span>
                </Link>
              }
            />
          ))}
      </Tabs>
    </div>
  );
}
