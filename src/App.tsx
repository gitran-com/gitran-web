import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { GlobalToast } from "./components/Toast";
const GitHub = lazy(() => import("./pages/github/Github"));
const Index = lazy(() => import("./pages/index/Index"));
const Login = lazy(() => import("./pages/login/Login"));
const Signup = lazy(() => import("./pages/login/Signup"));
const NotFound = lazy(() => import("./pages/404/404"));

export default function App() {
  return (
    <div className="App">
      <GlobalToast />
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Route path="/" component={Index} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/login/github/new" component={GitHub} />
          <Route path="/signup" component={Signup} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </div>
  );
}
