import { createEvent, createStore } from "effector";

import { loginFx, logoutFx } from "./auth.effects";

export const logout = createEvent();

export const $isAuthenticated = createStore<boolean>(!!localStorage.getItem('token'));

$isAuthenticated.on(loginFx.doneData, () => true);
$isAuthenticated.on(logoutFx.doneData, () => false);

logout.watch(() => logoutFx());