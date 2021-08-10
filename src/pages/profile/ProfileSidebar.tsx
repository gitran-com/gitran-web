import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { getUser, getUsers } from "@/apis/index";
import { UserInfo, UserId } from "@/types/user";

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
export default function SideBar() {
  const { userId } = useRouteMatch().params as { userId: UserId };
  const isMe: boolean = window.location.pathname === "/me";
  const [user, setUser] = useState<UserInfo>(initUserInfo);
  useEffect(() => {
    initUser();
  }, []);
  /**
   * 获取用户的个人信息
   */
  const initUser = async () => {
    const { data } = await (isMe ? getUser() : getUsers(userId));
    const { user }: { user: UserInfo } = data;
    setUser(user);
  };
  return (
    <div className="profile-sidebar">
      <div className="avatar-container">
        <Avatar src={user.avatarUrl || ""} style={{ position: "absolute", width: "100%", height: "100%" }} />
      </div>
      <div className="name">{user.name}</div>
      <div className="bio">{user.bio}</div>
    </div>
  );
}
