import { createStore } from 'effector';
import { UserModel } from './user.types';
import { loginFx, logoutFx } from './auth.effects';

export const $user = createStore<UserModel | null>(null)
    .on(loginFx.doneData, (_, payload) => payload)
    .on(logoutFx.doneData, () => null);


(window as any).userStore = $user;