import React, { useState } from "react";
import { MarkGithubIcon } from "@primer/octicons-react";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import { githubLogin, setLoginToken } from "@/utils/index";
import { authLogin, authRegister } from "@/apis/index";
import { Code } from "@/apis/types/http";

export default function Login(page: "login" | "signup") {
  const isLogin = page === "login";
  // 表单信息
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  // 是否显示错误提示
  const [openMsg, setOpenMsg] = useState(false);
  // 错误信息
  const [msg, setMsg] = useState("");

  /**
   * 点击按钮的回调函数
   */
  const onBtnClick = async () => {
    isLogin ? signIn() : signUp();
  };
  /**
   * 显示错误消息
   * @param text 消息内容
   */
  const showAlert = (text: string) => {
    setOpenMsg(true);
    setMsg(text);
  };
  /**
   * 登录
   */
  const signIn = async () => {
    const { code, data } = await authLogin({ email, password });
    if (code === Code["wrong email"]) {
      showAlert("Wrong email address or password");
    } else {
      setLoginToken(data);
    }
  };
  /**
   * 注册
   */
  const signUp = async () => {
    // todo password complexity check
    const passwordDiff = password !== password2;
    // todo
    const emailLegal: boolean = true;
    const nameLegal: boolean = name.length !== 0;
    passwordDiff && showAlert("Entered password differ");
    !emailLegal && showAlert("Email is invalid");
    !nameLegal && showAlert("Name is invalid");
    if (!passwordDiff && emailLegal && nameLegal) {
      const { code, data } = await authRegister({ name, email, password });
      if (code === Code["email exists"]) {
        showAlert("Email exists");
      } else {
        setLoginToken(data);
      }
    }
  };
  /**
   * 关闭错误提示
   */
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
          {msg}
        </Alert>
      </Snackbar>
      <Logo />
      <div className="title">{isLogin ? "Sign in to Gitran" : "Sign up for Gitran"}</div>
      {/* 登录表单填写 */}
      <div className="form">
        {!isLogin && (
          <div className="name form-item">
            <div>Name</div>
            <input onInput={e => setName(e.currentTarget.value)} />
          </div>
        )}
        <div className="email form-item">
          <div>Email address</div>
          <input onInput={e => setEmail(e.currentTarget.value)} />
        </div>
        <div className="password form-item">
          <div>Password</div>
          <input type="password" onInput={e => setPassword(e.currentTarget.value)} />
        </div>
        {!isLogin && (
          <div className="password form-item">
            <div>Repeat Password</div>
            <input type="password" onInput={e => setPassword2(e.currentTarget.value)} />
          </div>
        )}
        <Button text={isLogin ? "Sign in" : "Create account"} onClick={onBtnClick} style={{ fontWeight: "bold" }} />
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
