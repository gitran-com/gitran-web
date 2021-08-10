import React, { useState, useEffect } from "react";
import { isLogin, logout, navigateTo } from "@/utils/index";
import { getUser } from "@/apis/user";
import { UserInfo } from "../types/user";
import Logo from "./Logo";
import { Avatar, Button, Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";

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
    if (loggedIn) {
      initUser();
    }
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
  const onAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  /**
   * 点击Profile选项
   */
  const onProfileClick = () => {
    navigateTo("/me");
  };
  const onProjectClick = () => {
    navigateTo("/me");
  };
  const onLogout = () => {
    setAnchorEl(null);
    logout();
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
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={onAvatarClick}>
                <Avatar src={user.avatarUrl} />
              </Button>
            </>
          ) : (
            <>
              <Link className="login" to="/login">
                LOG IN
              </Link>
              <Link className="signup" to="/signup">
                SIGN UP
              </Link>
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
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={onProfileClick}>Profile</MenuItem>
          <MenuItem onClick={onProjectClick}>My Projects</MenuItem>
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
