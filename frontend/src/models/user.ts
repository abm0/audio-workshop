import { createStore } from 'effector';
import { UserStore } from './user.types';
import { loginFx, logoutFx } from './auth.effects';

export const $user = createStore<UserStore | null>(null)
    .on(loginFx.doneData, (_, payload) => payload)
    .on(logoutFx.doneData, () => null);
