import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { getUser } from "@/apis/index";
import { UserInfo } from "@/types/user";
import { AVATAR_KEY, storage } from "@/utils/storage";

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
  const [user, setUser] = useState<UserInfo>(initUserInfo);
  useEffect(() => {
    initUser();
  }, []);
  /**
   * 获取用户的个人信息
   */
  const initUser = async () => {
    const { data } = await getUser();
    const { user }: { user: UserInfo } = data;
    setUser(user);
  };
  return (
    <div className="profile-sidebar">
      <Avatar src={user.avatarUrl || storage.get(AVATAR_KEY) || ""} style={{ width: "100%", height: "100%" }} />
      <div className="name">{user.name}</div>
      <div className="bio">{user.bio}</div>
    </div>
  );
}
