export type LanguageId = number;
export type LangCode = "zh-CN" | "en" | "ru" | "fr" | "ar" | "es" | "ja";
export interface Lang {
  id: LanguageId;
  code: LangCode;
  iso: string;
  name: string;
}
