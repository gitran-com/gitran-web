import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createTheme } from "@material-ui/core";
import "./index.css";
import "@/styles/index.scss";
import App from "./App";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById("root")
);
