import { createEvent, createStore } from "effector";

import { loginFx, logoutFx } from "./auth.effects";
import { AuthStore } from "./auth.types";
import { ACCESS_TOKEN_LS_KEY } from "../shared/constants";

export const logout = createEvent();

export const $isAuthenticated = createStore<AuthStore>(!!localStorage.getItem(ACCESS_TOKEN_LS_KEY));

$isAuthenticated.on(loginFx.doneData, () => true);
$isAuthenticated.on(logoutFx.doneData, () => false);

logout.watch(() => logoutFx());