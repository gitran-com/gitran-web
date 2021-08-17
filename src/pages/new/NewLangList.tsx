import React from "react";
import { PlusIcon, XIcon } from "@primer/octicons-react";
import { langToFlag } from "@/utils/index";
import { Lang, LangCode } from "@/types/index";

export default function NewLangList({
  setEditingLangs,
  langs,
  setLangs,
  allLangs,
  onDialogOpen,
}: {
  setEditingLangs: React.Dispatch<React.SetStateAction<0 | 1>>;
  langs: [LangCode[], LangCode[]];
  setLangs: React.Dispatch<React.SetStateAction<[LangCode[], LangCode[]]>>;
  allLangs: Lang[];
  onDialogOpen: () => void;
}) {
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
  const onAddClick = (index: 0 | 1) => {
    onDialogOpen();
    setEditingLangs(index);
  };
  return (
    <>
      {["Source Languages", "Translate Languages"].map((item, index) => {
        return (
          <div key={item} className="langs-item">
            {/* 标题 */}
            <div className="langs-title">
              {item}
              <div onClick={() => onAddClick(index as 0 | 1)}>
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
    </>
  );
}
