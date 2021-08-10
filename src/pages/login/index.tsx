import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { MarkGithubIcon } from "@primer/octicons-react";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Toast from "@/components/Toast";
import { githubLogin, isLogin, setLoginToken } from "@/utils/index";
import { authLogin, authRegister } from "@/apis/index";
import { Code } from "@/apis/types/http";

export default function Index(page: "login" | "signup") {
  if (isLogin() && page === "login") {
    return <Redirect to="/" />;
  }
  const isLoginPage = page === "login";
  // 表单信息
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  /**
   * 点击按钮的回调函数
   */
  const onBtnClick = async () => {
    isLoginPage ? signIn() : signUp();
  };
  /**
   * 登录
   */
  const signIn = async () => {
    const { code, data } = await authLogin({ email, password });
    if (code === Code["wrong email"]) {
      Toast.error("Wrong email address or password");
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
    passwordDiff && Toast.error("Entered password differ");
    !emailLegal && Toast.error("Email is invalid");
    !nameLegal && Toast.error("Name is invalid");
    if (!passwordDiff && emailLegal && nameLegal) {
      const { code, data } = await authRegister({ name, email, password });
      if (code === Code["email exists"]) {
        Toast.error("Email exists");
      } else {
        setLoginToken(data);
      }
    }
  };

  return (
    <div className="login">
      <Logo />
      <div className="title">{isLoginPage ? "Sign in to Gitran" : "Sign up for Gitran"}</div>
      {/* 登录表单填写 */}
      <div className="form">
        {!isLoginPage && (
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
        {!isLoginPage && (
          <div className="password form-item">
            <div>Repeat Password</div>
            <input type="password" onInput={e => setPassword2(e.currentTarget.value)} />
          </div>
        )}
        <Button text={isLoginPage ? "Sign in" : "Create account"} onClick={onBtnClick} style={{ fontWeight: "bold" }} />
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
