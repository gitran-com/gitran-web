import React, { FC } from "react";
import logoImage from "@/assets/favicon.png";

const Header: FC = () => {
  const menu: string[] = ["API", "About"];
  return (
    <div className="header">
      <div className="container">
        <div className="left">
          <img className="logo" src={logoImage} />
          <div className="menu">
            {menu.map((item: string) => (
              <div className="menu-item" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="right">
          <input className="input" placeholder="Search Gitran" />
          <div className="login">LOG IN</div>
          <div className="sign">SIGN UP</div>
        </div>
      </div>
    </div>
  );
};
export default Header;
