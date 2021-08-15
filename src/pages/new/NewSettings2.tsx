import React from "react";
import { TextField } from "@material-ui/core";

export default function Settings2() {
  return (
    <>
      <TextField className="input" label="Git URL" variant="outlined" />
      <TextField className="input" label="Access Token" variant="outlined" helperText="optional" />
    </>
  );
}
