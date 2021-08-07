import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import { MarkGithubIcon } from "@primer/octicons-react";
import { githubLogin } from "@/utils/index";
import { login } from "@/apis/auth";
import { Code } from "@/apis/types/http";
import { setToken } from "@/apis/token";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 是否显示错误提示
  const [openMsg, setOpenMsg] = useState(false);
  const onSignIn = async () => {
    const { code, data } = await login({ email, password });
    if (code === Code["wrong-email"]) {
      setOpenMsg(true);
    } else {
      const { expires_at: expire, refresh_before: refresh, token, url } = data;
      setToken({ expire, refresh, token });
      window.location.href = url;
    }
  };
  const onMsgClose = () => {
    setOpenMsg(false);
  };
  return (
    <div className="login">
      {/* 错误提示框 */}
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={openMsg}
        autoHideDuration={5000}
        onClose={onMsgClose}
      >
        <Alert elevation={6} onClose={onMsgClose} severity={"error"}>
          Wrong email address or password
        </Alert>
      </Snackbar>
      <Logo />
      <div className="title">Sign in to Gitran</div>
      {/* 登录表单填写 */}
      <div className="form">
        <div className="name form-item">
          <div>Email address</div>
          <input onInput={e => setEmail(e.currentTarget.value)} />
        </div>
        <div className="password form-item">
          <div>Password</div>
          <input type="password" onInput={e => setPassword(e.currentTarget.value)} />
        </div>
        <Button text="Sign in" onClick={onSignIn} style={{ fontWeight: "bold" }} />
        {/* 其他登录方式 */}
        <div className="others">
          <div className="or">or</div>
          <Button
            text="Sign in with GitHub"
            icon={<MarkGithubIcon size={30} />}
            background="black"
            onClick={githubLogin}
          />
        </div>
      </div>
    </div>
  );
}
