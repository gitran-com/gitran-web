import { LangCode } from "@/types/language";

import zhCN from "@/assets/flags/zh-CN.png";
import enGB from "@/assets/flags/en-GB.png";
import enUS from "@/assets/flags/en-US.png";
import ru from "@/assets/flags/ru.png";
import fr from "@/assets/flags/fr.png";
import ar from "@/assets/flags/ar.png";
import es from "@/assets/flags/es.png";
import ja from "@/assets/flags/ja.png";
import de from "@/assets/flags/de.png";

import zhCNR from "@/assets/flags/zh-CN-r.png";
import enGBR from "@/assets/flags/en-GB-r.png";
import enUSR from "@/assets/flags/en-US-r.png";
import ruR from "@/assets/flags/ru-r.png";
import frR from "@/assets/flags/fr-r.png";
import arR from "@/assets/flags/ar-r.png";
import esR from "@/assets/flags/es-r.png";
import jaR from "@/assets/flags/ja-r.png";
import deR from "@/assets/flags/de-r.png";

const squareFlags = { "zh-CN": zhCN, "en-GB": enGB, "en-US": enUS, ru, fr, ar, es, ja, de };
const roundFlags = {
  "zh-CN": zhCNR,
  "en-GB": enGBR,
  "en-US": enUSR,
  ru: ruR,
  fr: frR,
  ar: arR,
  es: esR,
  ja: jaR,
  de: deR,
};

/**
 * 根据语言代码拿到国旗图片文件
 * @param lang 语言代码
 */
export function langToFlag(lang: LangCode, shape?: "square" | "round") {
  switch (shape) {
    case "square":
      return squareFlags[lang];
    case "round":
      return roundFlags[lang];
    default:
      return squareFlags[lang];
  }
}
