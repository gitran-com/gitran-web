export type LanguageId = number;
export type LangCode = "zh-CN" | "en-GB" | "en-US" | "ru" | "fr" | "ar" | "es" | "ja" | "de";
export interface Lang {
  id: LanguageId;
  code: LangCode;
  iso: string;
  name: string;
}
