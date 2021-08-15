import React, { useState, useEffect, useReducer } from "react";
import { InputAdornment, TextField, MenuItem, Button } from "@material-ui/core";
import { PlusIcon, XIcon } from "@primer/octicons-react";
import { GitHubRepo, Lang, LangCode } from "@/types/index";
import { getLanguages } from "@/apis/index";
import { langToFlag } from "@/utils/index";
import Settings1 from "./NewSettings1";
import Settings2 from "./NewSettings2";
import NewDialog from "./NewDialog";

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
interface ProjInfo {
  name: string;
  desc?: string;
  uri: string;
}
export default function New() {
  const [projType, setProjType] = useState<number>(0);
  // 所有的语言列表
  const [allLangs, setAllLangs] = useState<Lang[]>([]);
  // langs[0]: source languages; langs[1]: translate languages
  const [langs, setLangs] = useState<[LangCode[], LangCode[]]>([[], []]);
  // 当前正在编辑添加的语言 source/translate
  const [editingLangs, setEditingLangs] = useState<0 | 1>(0);
  // 选择语言的Dialog
  const [openDiag, setOpenDiag] = useState(false);
  // 用户选择的GitHub仓库
  const [repo, setRepo] = useState<string>("");
  // 用户所有的GitHub仓库
  const [allRepos, setAllRepos] = useState<GitHubRepo[]>([]);

  const menu: MenuItem[] = [
    {
      key: 0,
      type: Projects.GitHub,
      content: "Import from My GitHub",
      component: <Settings1 {...{ repo, setRepo, allRepos, setAllRepos }} />,
    },
    { key: 1, type: Projects.Git, content: "Import from Git URL", component: <Settings2 /> },
    { key: 2, type: Projects.Empty, content: "Create Empty Project" },
  ];

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
  /**
   * 点击add图标添加语言
   */
  const addLang = (index: 0 | 1) => {
    setOpenDiag(true);
    setEditingLangs(index);
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
      <div className="new-type">
        <div className="tab">
          {menu.map(item => (
            <div
              key={item.key}
              className={item.key === projType ? "tab-cur tab-item" : "tab-item"}
              onClick={() => {
                setProjType(item.key);
              }}
            >
              {item.content}
            </div>
          ))}
          <div className="tab-bottom" style={{ transform: `translateX(${menu[projType].key * 200}px)` }}></div>
        </div>
        <div className="settings">{menu[projType].component}</div>
      </div>
      {/* 源语言与目标语言选择 */}
      <div className="langs">
        {["Source Languages", "Translate Languages"].map((item, index) => {
          return (
            <div key={item} className="langs-item">
              {/* 标题 */}
              <div className="langs-title">
                {item}
                <div onClick={() => addLang(index as 0 | 1)}>
                  <PlusIcon className="list-add" size={24} />
                </div>
              </div>
              {/* 语言列表 */}
              <div className="langs-list">
                {langs[index].map((code, langIndex) => (
                  <div key={code} className="list-item">
                    <img className="list-flag" src={langToFlag(code, "round")} />
                    <div className="list-text">
                      <div>{codeToLang(code).name}</div>
                      <div className="list-iso">{codeToLang(code).iso}</div>
                    </div>
                    <div className="list-del" onClick={() => deleteLang(index as 0 | 1, langIndex)}>
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
      {/* 创建按钮 */}
      <div className="new-create">
        <Button color="primary" variant="contained" disabled size="large">
          Create
        </Button>
      </div>
    </div>
  );
}
