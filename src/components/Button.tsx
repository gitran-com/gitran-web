import React, { MouseEventHandler } from "react";

/**
 * 自定义按钮
 */
export default function Button({
  text,
  icon,
  background = "#32b256",
  onClick,
  style = {},
}: {
  text: string;
  icon?: React.ReactNode;
  background?: string;
  onClick: MouseEventHandler;
  style?: any;
}) {
  return (
    <div className="button-component" style={{ ...style, backgroundColor: background }} onClick={onClick}>
      {icon}
      <div style={{ marginLeft: icon ? "20px" : "" }}>{text}</div>
    </div>
  );
}
