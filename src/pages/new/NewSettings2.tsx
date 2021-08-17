import React from "react";
import { debounce, TextField } from "@material-ui/core";

export default function Settings2({ onInput }) {
  return (
    <>
      <TextField className="input" label="Git URL" variant="outlined" onInput={debounce(onInput("gitUrl"))} />
      <TextField
        className="input"
        label="Access Token"
        variant="outlined"
        helperText="optional"
        onInput={debounce(onInput("accessToken"))}
      />
    </>
  );
}
