import CONFIG from "../config";

export function githubLogin() {
  window.location.href = CONFIG.github.loginURL;
}
