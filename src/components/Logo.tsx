import React from "react";
import logoImage from "@/assets/favicon.png";

export default function Logo({ size = 50, style = {} }: { size?: number; style?: any }) {
  return <img src={logoImage} style={{ ...style, width: `${size}px`, height: `${size}px` }} />;
}
