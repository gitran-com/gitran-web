import React, { useState, useEffect } from "react";
import Content from "./ProfileContent";
import SideBar from "./ProfileSidebar";

export default function Profile() {
  return (
    <div className="profile">
      <div className="profile-container">
        <SideBar />
        <Content />
      </div>
    </div>
  );
}
