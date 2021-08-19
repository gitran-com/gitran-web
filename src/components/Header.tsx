import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AVATAR_KEY, isLogin, logout, navigateTo, storage } from "@/utils/index";
import { getUser } from "@/apis/user";
import { UserInfo } from "../types/user";
import Logo from "./Logo";
import { Button, Menu, MenuItem, Avatar } from "@material-ui/core";

export default function Header() {
  const menu: string[] = ["API", "About"];
  const loggedIn = isLogin();
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
    const { user }: { user: UserInfo } = data;
    if (storage.get(AVATAR_KEY) !== user.avatarUrl) {
      storage.set(AVATAR_KEY, user.avatarUrl);
    }
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
  const onSettingsClick = () => {};
  const onProjectClick = () => {
    navigateTo("/me");
  };
  const onLogout = () => {
    setAnchorEl(null);
    logout();
  };
  return window.location.pathname === "/login" || window.location.pathname === "/signup" ? null : (
    <div className="header-component">
      <div className="container">
        <div className="left">
          <Link to="/">
            <Logo size={30} style={{ marginRight: "20px" }} />
          </Link>
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
                <Avatar alt="shaw" src={storage.get(AVATAR_KEY) || ""} />
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
          <MenuItem onClick={onSettingsClick}>Settings</MenuItem>
          <MenuItem onClick={onProjectClick}>My Projects</MenuItem>
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
