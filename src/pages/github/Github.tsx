import React, { useState } from "react";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Toast from "@/components/Toast";
import { authGithubNew } from "@/apis/index";
import { setLoginToken } from "@/utils/index";

export default function Github() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const onBtnClick = async () => {
    // todo 密码安全性检查；密码加密
    if (password !== password2) {
      Toast.error("Password differ");
    }
    if (password === password2) {
      const { data } = await authGithubNew(
        password,
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJPdXlhbmdIYW55dSIsImV4cCI6MTYyODk5Nzg1OSwianRpIjoiOSIsImlhdCI6MTYyODM5MzA1OSwiaXNzIjoiZ2l0cmFuIiwibmJmIjoxNjI4MzkzMDU5LCJzdWIiOiJnaXRodWItZmlyc3QtbG9naW4ifQ.k4VKamjbk7lj-Yilescaq6zWmGvqk6iI_D_3ai0kPMM"
        // document.cookie
        //   .split(";")
        //   .filter(item => item.split("=")[0] === "token")[0]
        //   .split("=")[1]
      );
      setLoginToken(data);
    }
  };
  return (
    <div className="github">
      <Logo />
      <div className="title">Set Password</div>
      <div className="form">
        <div className="password form-item">
          <div>Password</div>
          <input type="password" onInput={e => setPassword(e.currentTarget.value)} />
        </div>
        <div className="password form-item">
          <div>Repeat Password</div>
          <input type="password" onInput={e => setPassword2(e.currentTarget.value)} />
        </div>
        <Button text="Get Started" onClick={onBtnClick} />
      </div>
    </div>
  );
}
