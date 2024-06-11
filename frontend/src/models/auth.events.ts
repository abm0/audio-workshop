import { createEvent } from "effector";

export const login = createEvent();
export const logout = createEvent();
export const requestFailed401 = createEvent();
export const refreshFailed = createEvent();