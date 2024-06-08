import { createEvent, createStore, sample } from "effector";

import { loginFx } from "./auth.effects";
import { AUTH_TOKEN_LS_KEY } from "../shared/constants";

export const logout = createEvent();

export const $isAuthenticated = createStore<boolean>(!!localStorage.getItem('token'));

$isAuthenticated.on(loginFx.doneData, () => true);
$isAuthenticated.on(logout, () => {
  localStorage.removeItem(AUTH_TOKEN_LS_KEY);
  return false;
});

(window as any).authStore = $isAuthenticated;