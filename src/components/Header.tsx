import React, { useState, useEffect } from "react";
import { isLogin } from "@/utils/isLogin";
import { getUser } from "@/apis/user";
import { UserInfo } from "../types/user";
import Logo from "./Logo";
import { Avatar, Button, Menu, MenuItem } from "@material-ui/core";

const initUserInfo: UserInfo = {
  id: -1,
  name: "",
  email: "",
  avatarUrl: "",
  bio: "",
  githubId: -1,
  createdAt: "",
  updatedAt: "",
};
export default function Header() {
  const menu: string[] = ["API", "About"];
  const loggedIn = isLogin();
  const [user, setUser] = useState<UserInfo>(initUserInfo);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  useEffect(() => {
    initUser();
  }, []);
  /**
   * 获取用户的个人信息
   */
  const initUser = async () => {
    const { data } = await getUser();
    setUser(data);
  };
  /**
   * 点击头像按钮
   */
  const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
        <div className="right">
          <input className="input" placeholder="Search Gitran" />
          {loggedIn ? (
            <>
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleAvatarClick}>
                <Avatar src={user.avatarUrl} />
              </Button>
            </>
          ) : (
            <>
              <div className="login">LOG IN</div>
              <div className="sign">SIGN UP</div>
            </>
          )}
        </div>
        <Menu
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My Projects</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
