import { createStore } from "effector";

import { loginFx, logoutFx, refreshTokenFx } from "./auth.effects";
import { AuthStore } from "./auth.types";
import { ACCESS_TOKEN_LS_KEY } from "../shared/constants";
import { loadProfileFx } from "./user.effects";
import { login, logout, requestFailed401 } from "./auth.events";
import { loadSongsFx } from "./song.effects";

export const $isAuthenticated = createStore<AuthStore>(!!localStorage.getItem(ACCESS_TOKEN_LS_KEY));

$isAuthenticated
  .on(loginFx.doneData, () => true)
  .on(logoutFx.done, () => false)
  .on(refreshTokenFx.fail, () => false);

login.watch(() => {
  loadProfileFx();
  loadSongsFx();
})
logout.watch(() => logoutFx());
requestFailed401.watch(() => refreshTokenFx())