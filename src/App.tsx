import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { GlobalToast } from "./components/Toast";
const GitHub = lazy(() => import("./pages/github/Github"));
const Index = lazy(() => import("./pages/index/Index"));
const Login = lazy(() => import("./pages/login/Login"));

export default function App() {
  return (
    <div className="App">
      <GlobalToast />
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Route path="/" component={Index} exact />
          <Route path="/login" component={() => Login("login")} exact />
          <Route path="/login/github/new" component={GitHub} />
          <Route path="/signup" component={() => Login("signup")} />
        </Switch>
      </Suspense>
    </div>
  );
}
