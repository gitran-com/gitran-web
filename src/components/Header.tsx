import { getTokenSync } from "@/apis/token";
import React, { FC } from "react";
import Logo from "./Logo";

const Header: FC = () => {
  const menu: string[] = ["API", "About"];
  const token = getTokenSync();
  return (
    <div className="header">
      <div className="container">
        <div className="left">
          <Logo size={30} style={{ marginRight: "20px" }} />
          <div className="menu">
            {menu.map((item: string) => (
              <div className="menu-item" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>
        {!token && (
          <div className="right">
            <input className="input" placeholder="Search Gitran" />
            <div className="login">LOG IN</div>
            <div className="sign">SIGN UP</div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
