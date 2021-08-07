import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Index from "./pages/index/Index";
import Login from "./pages/login/Login";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Index} exact />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}
