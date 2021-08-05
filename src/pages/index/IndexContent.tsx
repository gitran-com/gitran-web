import React, { FC } from "react";

const Content: FC = () => {
  return (
    <div className="home-content">
      <div className="left">
        <div className="title">Crowdsource Translation</div>
        <div className="desc">Open source crowdsourcing translation tool using Git and GitHub to collaborate</div>
        <div className="login">
          <input className="login-input" placeholder="email address" />
          <div className="login-button">Sign in using GitHub</div>
        </div>
      </div>
    </div>
  );
};
export default Content;
