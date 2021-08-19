import React, { useState, useEffect } from "react";
import { InputAdornment, TextField, MenuItem, Button, Tabs, Tab } from "@material-ui/core";
import { GitHubRepo, Lang, LangCode, ProjectType } from "@/types/index";
import { getLanguages, getProjectExist, postNewProject } from "@/apis/index";
import { debounce } from "@/utils/index";
import Settings1 from "./NewSettings1";
import Settings2 from "./NewSettings2";
import NewDialog from "./NewDialog";
import NewLangList from "./NewLangList";

export interface MenuItem {
  type: ProjectType;
  content: string;
  component?: JSX.Element;
}
interface ProjInfo {
  name: string;
  desc: string;
  uri: string;
  gitUrl: string;
  accessToken?: string;
}
export default function New() {
  // 项目基本信息
  const [basicValues, setBasicValues] = useState<ProjInfo>({
    name: "",
    uri: "",
    desc: "",
    gitUrl: "",
  });
  // 错误信息
  const [err, setErr] = useState<ProjInfo>({
    name: "",
    desc: "",
    uri: "",
    gitUrl: "",
  });
  const [projType, setProjType] = useState<number>(0);
  // 所有的语言列表
  const [allLangs, setAllLangs] = useState<Lang[]>([]);
  // langs[0]: source languages; langs[1]: translate languages
  const [langs, setLangs] = useState<[LangCode[], LangCode[]]>([[], []]);
  // 当前正在编辑添加的语言 source/translate
  const [editingLangs, setEditingLangs] = useState<0 | 1>(0);
  // 选择语言的Dialog
  const [openDiag, setOpenDiag] = useState(false);
  // 用户所有的GitHub仓库
  const [allRepos, setAllRepos] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    initLangs();
  }, []);
  /**
   * 初始化语言列表
   */
  const initLangs = async () => {
    const { data } = await getLanguages();
    setAllLangs(data.langs as Lang[]);
  };
  /**
   * 关闭语言选择对话框
   */
  const onDialogClose = () => {
    setOpenDiag(false);
  };
  /**
   * 输入函数
   * @param prop
   */
  const onInput = (prop: keyof ProjInfo) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    setBasicValues({ ...basicValues, [prop]: e.target.value });
    if (prop === "uri") {
      const isValid = /^[0-9a-z]{1,16}$/.test(e.target.value);
      if (!isValid) {
        setErr({ ...err, uri: "Invalide address" });
      } else {
        const { data } = await getProjectExist(e.target.value);
        setErr({ ...err, uri: !data.existed ? "" : "Project existed or Invalid address" });
      }
    }
  };
  /**
   * 创建新项目
   */
  const onProjectCreate = () => {
    const { name, uri, desc, gitUrl, accessToken } = basicValues;
    postNewProject(projType, name, uri, desc, gitUrl, langs[0], langs[1], accessToken);
  };
  const menu: MenuItem[] = [
    {
      type: ProjectType.GitHub,
      content: "Import from My GitHub",
      component: (
        <Settings1
          {...{
            repo: basicValues.gitUrl,
            setRepo: repo => {
              setBasicValues({ ...basicValues, gitUrl: repo });
            },
            allRepos,
            setAllRepos,
          }}
        />
      ),
    },
    { type: ProjectType.Git, content: "Import from Git URL", component: <Settings2 {...{ onInput }} /> },
    // {  type: Projects.Empty, content: "Create Empty Project" },
  ];
  return (
    <div className="new-project">
      <div className="title">Create a Gitran Project</div>
      <TextField
        className="input"
        label="Project Name"
        variant="outlined"
        onChange={debounce(onInput("name"))}
        error={Boolean(err.name)}
        inputProps={{
          maxLength: 16,
        }}
      />
      <TextField
        className="input"
        label="Project Address"
        variant="outlined"
        onInput={debounce(onInput("uri"))}
        helperText={err.uri}
        error={Boolean(err.uri)}
        InputProps={{
          startAdornment: <InputAdornment position="start">{window.location.origin}/</InputAdornment>,
        }}
        inputProps={{
          maxLength: 16,
        }}
      />
      <TextField
        className="input"
        label="Project Description"
        variant="outlined"
        helperText="optional"
        onInput={onInput("desc")}
      />
      {/* 项目类型选择栏 */}
      <div className="new-type">
        <Tabs
          value={projType}
          onChange={(event: React.ChangeEvent<{}>, newValue: number) => {
            setProjType(newValue);
          }}
          textColor="primary"
          indicatorColor="primary"
        >
          {menu.map(item => (
            <Tab key={item.type} label={item.content} />
          ))}
        </Tabs>
        <div className="settings">{menu[projType].component}</div>
      </div>
      {/* 源语言与目标语言选择 */}
      <div className="langs">
        <NewLangList
          {...{
            setEditingLangs,
            langs,
            allLangs,
            setLangs,
            onDialogOpen: () => {
              setOpenDiag(true);
            },
          }}
        />
        <NewDialog
          list={allLangs}
          selected={langs[editingLangs]}
          setSelect={x => {
            const newLangs: [LangCode[], LangCode[]] = [...langs];
            newLangs[editingLangs] = x;
            setLangs(newLangs);
          }}
          open={openDiag}
          onClose={onDialogClose}
        />
      </div>
      {/* 创建按钮 */}
      <div className="new-create">
        <Button
          color="primary"
          variant="contained"
          disabled={
            !basicValues.name ||
            !basicValues.uri ||
            !langs[0].length ||
            !langs[1].length ||
            !basicValues.gitUrl ||
            Boolean(err.uri)
          }
          size="large"
          onClick={onProjectCreate}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
