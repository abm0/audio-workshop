import { createStore } from 'effector';
import { ProfileStore } from './user.types';
import { loadProfileFx } from './user.effects';
import { logout } from './auth.events';

export const $profile = createStore<ProfileStore | null>(null)
    .on(loadProfileFx.doneData, (_, payload) => payload)
    .on(logout, () => null);
