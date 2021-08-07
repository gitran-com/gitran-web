import Button from "@/components/Button";
import { githubLogin } from "@/utils/oauth";
import { MarkGithubIcon } from "@primer/octicons-react";
import React, { FC } from "react";

const Content: FC = () => {
  return (
    <div className="home-content">
      <div className="left">
        <div className="title">Crowdsource Translation</div>
        <div className="desc">Open source crowdsourcing translation tool using Git and GitHub to collaborate</div>
        <div className="login">
          <Button text="Get started without signing up" icon={<MarkGithubIcon size={30} />} onClick={githubLogin} />
        </div>
      </div>
    </div>
  );
};
export default Content;
