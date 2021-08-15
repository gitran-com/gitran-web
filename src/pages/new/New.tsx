import React, { useState, useEffect } from "react";
import { InputAdornment, TextField, Button } from "@material-ui/core";
import { MarkGithubIcon, PlusIcon, XIcon } from "@primer/octicons-react";
import NewTab from "./NewTab";
import NewDialog from "./NewDialog";
import { Lang, LangCode } from "@/types/index";
import { getLanguages } from "@/apis/index";
import { langToFlag } from "@/utils/langToFlag";

enum Projects {
  GitHub,
  Git,
  Empty,
}
export interface MenuItem {
  key: number;
  type: Projects;
  content: string;
  component?: JSX.Element;
}
export const menu: MenuItem[] = [
  { key: 0, type: Projects.GitHub, content: "Import from My GitHub", component: Settings1() },
  { key: 1, type: Projects.Git, content: "Import from Git URL" },
  { key: 2, type: Projects.Empty, content: "Create Empty Project" },
];
export default function New() {
  const [curTab, setCurTab] = useState<MenuItem>(menu[0]);
  const [allLangs, setAllLangs] = useState<Lang[]>([]);
  const [langs, setLangs] = useState<[LangCode[], LangCode[]]>([[], []]);
  const [editingLangs, setEditingLangs] = useState<0 | 1>(0);
  const [openDiag, setOpenDiag] = useState(false);
  useEffect(() => {
    initLangs();
  }, []);
  const initLangs = async () => {
    const { data } = await getLanguages();
    setAllLangs(data.langs as Lang[]);
  };
  const onDialogClose = () => {
    setOpenDiag(false);
  };
  /**
   * 根据语言的code获取语言
   */
  const codeToLang = (code: LangCode) => {
    return allLangs.filter(item => item.code === code)[0];
  };
  /**
   * 删除语言
   * @param langType 待删除语言的类型 source/translate
   * @param langIndex 待删除语言的index
   */
  const deleteLang = (langType: 0 | 1, langIndex: number) => {
    const newLangs: [LangCode[], LangCode[]] = [...langs];
    newLangs[langType] = [...newLangs[langType].slice(0, langIndex), ...newLangs[langType].slice(langIndex + 1)];
    setLangs(newLangs);
  };
  return (
    <div className="new-project">
      <div className="title">Create a Gitran Project</div>
      <TextField className="input" label="Project Name" variant="outlined" />
      <TextField
        className="input"
        label="Project Address"
        variant="outlined"
        InputProps={{ startAdornment: <InputAdornment position="start">{window.location.origin}/</InputAdornment> }}
      />
      {/* 项目类型选择栏 */}
      <div>
        <NewTab curTab={curTab} setCurTab={setCurTab} />
        {curTab.component}
      </div>
      {/* 源语言与目标语言选择 */}
      <div className="langs">
        {["Source Languages", "Translate Languages"].map((item, index) => {
          return (
            <div key={item} className="langs-item">
              <div className="langs-title">
                {item}
                <div
                  onClick={() => {
                    setOpenDiag(true);
                    setEditingLangs(index as 0 | 1);
                  }}
                >
                  <PlusIcon className="list-add" size={24} />
                </div>
              </div>
              <div className="langs-list">
                {langs[index].map((code, langIndex) => (
                  <div key={code} className="list-item">
                    <img className="list-flag" src={langToFlag(code, "round")} />
                    <div className="list-text">
                      <div>{codeToLang(code).name}</div>
                      <div className="list-iso">{codeToLang(code).iso}</div>
                    </div>
                    <div
                      className="list-del"
                      onClick={() => {
                        deleteLang(index as 0 | 1, langIndex);
                      }}
                    >
                      <XIcon className="list-del-icon" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
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
    </div>
  );
}

function Settings1() {
  return (
    <div>
      <Button>
        <MarkGithubIcon />
        Click to import
      </Button>
    </div>
  );
}
