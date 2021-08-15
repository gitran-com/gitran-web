import React from "react";
import { MenuItem, menu } from "./New";

// 仓库类型选项
export default function ab({
  curTab,
  setCurTab,
}: {
  curTab: MenuItem;
  setCurTab: React.Dispatch<React.SetStateAction<MenuItem>>;
}) {
  return (
    <div className="new-tab">
      {menu.map(item => (
        <div
          key={item.key}
          className={item.type === curTab.type ? "tab-cur tab-item" : "tab-item"}
          onClick={() => {
            setCurTab(item);
          }}
        >
          {item.content}
        </div>
      ))}
      <div className="tab-bottom" style={{ transform: `translateX(${curTab.key * 200}px)` }}></div>
    </div>
  );
}
