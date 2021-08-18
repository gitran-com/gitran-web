import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { CircularProgress } from "@material-ui/core";
import { GlobalToast } from "./components/Toast";
import Header from "./components/Header";
const GitHub = lazy(() => import("./pages/github/Github"));
const Index = lazy(() => import("./pages/index/Index"));
const Login = lazy(() => import("./pages/login/Login"));
const Signup = lazy(() => import("./pages/login/Signup"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const New = lazy(() => import("./pages/new/New"));
const Project = lazy(() => import("./pages/project/Project"));
const NotFound = lazy(() => import("./pages/404/404"));

export default function App() {
  return (
    <div className="App">
      <GlobalToast />
      <Header />
      <Suspense fallback={<CircularProgress />}>
        <Switch>
          <Route path="/" component={Index} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/login/github/new" component={GitHub} />
          <Route path="/signup" component={Signup} />
          <Route path="/me" component={Profile} />
          <Route path="/user/:userId" component={Profile} />
          <Route path="/new" component={New} />
          <Route path="/project/:uri" component={Project} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </div>
  );
}
