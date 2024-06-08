import { createStore } from 'effector';
import { UserModel } from './user.types';
import { loginFx } from './auth.effects';
import { logout } from './auth';

export const $user = createStore<UserModel | null>(null)
    .on(loginFx.doneData, (_, payload) => payload)
    .on(logout, () => null);


(window as any).userStore = $user;