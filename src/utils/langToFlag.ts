import zhCN from "@/assets/flags/zh-CN.png";
import en from "@/assets/flags/en.png";
import ru from "@/assets/flags/ru.png";
import fr from "@/assets/flags/fr.png";
import ar from "@/assets/flags/ar.png";
import es from "@/assets/flags/es.png";
import ja from "@/assets/flags/ja.png";
const flags = { "zh-CN": zhCN, en, ru, fr, ar, es, ja };
export type Lang = "zh-CN" | "en" | "ru" | "fr" | "ar" | "es" | "ja";

/**
 * 根据语言代码拿到国旗图片文件
 * @param lang 语言代码
 */
export function langToFlag(lang: Lang) {
  return flags[lang];
}
