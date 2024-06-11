import { createEvent, createStore } from "effector";

import { loginFx, logoutFx, refreshTokenFx } from "./auth.effects";
import { AuthStore } from "./auth.types";
import { ACCESS_TOKEN_LS_KEY } from "../shared/constants";

export const logout = createEvent();

export const $isAuthenticated = createStore<AuthStore>(!!localStorage.getItem(ACCESS_TOKEN_LS_KEY));

$isAuthenticated
  .on(loginFx.doneData, () => true)
  .on(logoutFx.done, () => false)
  .on(refreshTokenFx.fail, () => false);

logout.watch(() => logoutFx());