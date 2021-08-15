import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { Lang, LangCode } from "@/types/index";
import { useState } from "react";
import { useEffect } from "react";

export default function NewDialog({
  selected,
  list,
  setSelect,
  open,
  onClose,
}: {
  selected: LangCode[];
  list: Lang[];
  setSelect: (x: LangCode[]) => void;
  open: boolean;
  onClose: () => void;
}) {
  // 当前在对话框中被选中的语言代码列表
  const [cur, setCur] = useState<LangCode[]>(selected);
  // checkbox初始状态
  const [checked, setChecked] = useState<boolean[]>([]);
  useEffect(() => {
    setCur(selected);
  }, [selected]);
  /**
   * 根据code判断一门语言是否在给定的语言Code列表里
   * @param code
   */
  const langInList = (code: LangCode, list: LangCode[]) => {
    return list.indexOf(code) !== -1;
  };
  /**
   * 点击语言
   */
  const onCheckChange = (code: LangCode) => {
    const idx = cur.indexOf(code);
    if (idx !== -1) {
      setCur([...cur.slice(0, idx), ...cur.slice(idx + 1)]);
    } else {
      setCur([...cur, code]);
    }
  };
  const onOkClick = () => {
    onClose();
    setSelect(cur);
  };
  return (
    <div className="new-dialog">
      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle>Source Languages</DialogTitle>
        <DialogContent>
          {list.map(lang => (
            <div key={lang.code} className="dialog-item">
              <FormControlLabel
                style={{ width: "100%" }}
                control={
                  <Checkbox
                    name={lang.code}
                    checked={langInList(lang.code, cur)}
                    color="secondary"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      onCheckChange(e.target.name as LangCode);
                    }}
                  />
                }
                label={`${lang.name}(${lang.iso})`}
              />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="secondary" onClick={onOkClick}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
