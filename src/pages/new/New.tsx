import React, { useState, useEffect } from "react";
import { InputAdornment, TextField } from "@material-ui/core";

export default function New() {
  return (
    <div className="new-project">
      <div className="title">Create a Gitran Project</div>
      <TextField className="input" label="Project Name" variant="outlined" />
      <TextField
        className="input"
        label="Project Address"
        variant="outlined"
        InputProps={{ startAdornment: <InputAdornment position="start">https://gitran.com/project/</InputAdornment> }}
      />
    </div>
  );
}
