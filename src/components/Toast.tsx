import React, { useState, useEffect } from "react";
import { Snackbar } from "@material-ui/core";
import Alert, { Color } from "@material-ui/lab/Alert";

export function GlobalToast() {
  useEffect(() => {
    Toast.info = msg => {
      setOpen(true);
      setSeverity("info");
      setMsg(msg);
    };
    Toast.warn = msg => {
      setOpen(true);
      setSeverity("warning");
      setMsg(msg);
    };
    Toast.error = msg => {
      setOpen(true);
      setSeverity("error");
      setMsg(msg);
    };
    Toast.success = msg => {
      setOpen(true);
      setSeverity("success");
      setMsg(msg);
    };
  }, []);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("info" as Color);
  const onClose = (_: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
    >
      <Alert elevation={6} onClose={onClose} severity={severity}>
        {msg}
      </Alert>
    </Snackbar>
  );
}
export default class Toast {
  static info = (msg: string) => {};
  static warn = (msg: string) => {};
  static success = (msg: string) => {};
  static error = (msg: string) => {};
}
