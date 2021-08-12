import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { Avatar, Button, TextField } from "@material-ui/core";
import { getUser, getUsers, putUser } from "@/apis/index";
import { UserInfo, UserId } from "@/types/user";
import Toast from "@/components/Toast";

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
  const [editing, setEditing] = useState<boolean>(false);
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
  const refreshUser = async () => {
    const { data } = await getUser();
    const { user }: { user: UserInfo } = data;
    setUser(user);
  };
  return (
    <div className="profile-sidebar">
      <div className="avatar-container">
        {user.avatarUrl && (
          <Avatar src={user.avatarUrl} style={{ position: "absolute", width: "100%", height: "100%" }} />
        )}
      </div>
      {editing ? (
        <Edit
          initName={user.name}
          initBio={user.bio}
          cancel={() => {
            setEditing(false);
          }}
          refresh={refreshUser}
        />
      ) : (
        <>
          <div className="name">{user.name}</div>
          <div className="bio">{user.bio}</div>
          <Button
            variant="outlined"
            size="large"
            style={{ width: "100%", marginTop: "20px" }}
            onClick={() => setEditing(true)}
          >
            <div>Edit Profile</div>
          </Button>
        </>
      )}
    </div>
  );
}
const Edit = ({
  initName,
  initBio,
  cancel,
  refresh,
}: {
  initName: string;
  initBio: string;
  cancel: () => void;
  refresh: () => void;
}) => {
  const [name, setName] = useState<string>(initName);
  const [bio, setBio] = useState<string>(initBio);
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };
  const onSave = async () => {
    if (!name) {
      Toast.error("Name cannot be empty");
    } else if (!bio) {
      Toast.error("Bio cannot be empty");
    } else {
      if (name !== initName || bio !== initBio) {
        await putUser(name, bio);
        refresh();
        cancel();
        Toast.success("Update Successfully");
      } else {
        cancel();
      }
    }
  };
  return (
    <div className="edit">
      <TextField className="edit-input" value={name} label="Name" variant="outlined" onChange={onNameChange} />
      <TextField
        className="edit-input"
        style={{ width: "100%" }}
        multiline
        maxRows={3}
        value={bio}
        label="Bio"
        variant="outlined"
        onChange={onBioChange}
      />
      <div>
        <Button className="edit-button" variant="contained" disableElevation color="primary" onClick={onSave}>
          Save
        </Button>
        <Button className="edit-button" variant="outlined" onClick={cancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
