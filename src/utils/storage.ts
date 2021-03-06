export const storage = {
  remove: (key: string) => window.localStorage.removeItem(key),
  get: (key: string) => window.localStorage.getItem(key),
  set: (key: string, val: string) => window.localStorage.setItem(key, val),
  clear: () => window.localStorage.clear(),
};
export const AVATAR_KEY = "Gitran_Avatar";
export const TOKEN_KEY = "Gitran_Token";
