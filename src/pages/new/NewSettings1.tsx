import React, { useState } from "react";
import { InputAdornment, TextField, CircularProgress, MenuItem } from "@material-ui/core";
import { MarkGithubIcon } from "@primer/octicons-react";
import { authGithubRepo } from "@/apis/index";
import { GitHubRepo } from "@/types/index";

export default function Settings1({
  repo,
  setRepo,
  allRepos,
  setAllRepos,
}: {
  repo: string;
  setRepo: React.Dispatch<React.SetStateAction<string>>;
  allRepos: GitHubRepo[];
  setAllRepos: React.Dispatch<React.SetStateAction<GitHubRepo[]>>;
}) {
  // 是否显示选择列表
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  // 是否显示加载进度条
  const [openProgress, setOpenProgress] = useState<boolean>(false);
  /**
   * 点击选择列表
   */
  const onSelectClick = async () => {
    if (!allRepos.length) {
      setOpenProgress(true);
      const { data } = await authGithubRepo();
      setAllRepos(data.repos as GitHubRepo[]);
      setOpenProgress(false);
    }
    setOpenSelect(true);
  };
  return (
    <>
      <TextField
        className="input"
        label="Select Repository"
        variant="outlined"
        select
        value={allRepos.length ? repo : ""}
        onChange={(e: React.ChangeEvent<{ value: string }>) => {
          setRepo(e.target.value);
          setOpenSelect(false);
        }}
        SelectProps={{
          open: openSelect,
          onOpen: onSelectClick,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MarkGithubIcon />
            </InputAdornment>
          ),
        }}
      >
        {allRepos.map(r => (
          <MenuItem key={r.id} value={r.url}>
            {r.ownerName}/{r.name}
          </MenuItem>
        ))}
      </TextField>
      {openProgress && <CircularProgress />}
    </>
  );
}
