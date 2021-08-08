import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { GlobalToast } from "./components/Toast";
import Github from "./pages/github/Github";
import Index from "./pages/index/Index";
import Login from "./pages/login/Login";

export default function App() {
  return (
    <div className="App">
      <GlobalToast />
      <Switch>
        <Route path="/" component={Index} exact />
        <Route path="/login" component={() => Login("login")} exact />
        <Route path="/login/github/new" component={Github} />
        <Route path="/signup" component={() => Login("signup")} />
      </Switch>
    </div>
  );
}
