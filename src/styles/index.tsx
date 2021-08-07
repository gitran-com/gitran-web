import React, { FC } from "react";
import { Link } from "react-router-dom";
import logoImage from "@assets/favicon.png";

const Header: FC = () => {
  const menu: string[] = ["About"];
  return (
    <div className="home-header">
      <div className="container">
        <div className="left">
          <img className="logo" src={logoImage} />
          <div className="menu">
            {menu.map((item: string) => (
              <div>{item}</div>
            ))}
          </div>
        </div>
        <div className="right">
          <input className="input" placeholder="Search Gitran" />
          <Link to="/login">Sign In</Link>
          <Link to="/login">SIGN UP</Link>
        </div>
      </div>
    </div>
  );
};
export default Header;
