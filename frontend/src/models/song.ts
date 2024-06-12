import update from 'immutability-helper';
import { createEvent, createStore } from 'effector';
import { SongsStore } from './song.types';
import { deleteSongFx, loadSongsFx, uploadSongFx } from './song.effects';
import { keyBy } from 'lodash';
import { logout } from './auth.events';

const initialState = {
  byId: {}
}

export const $songs = createStore<SongsStore>(initialState)
    .on(uploadSongFx.doneData, (state, payload) => update(state, {
      byId: {
        [payload.id]: {
          $set: payload
        }
      }
    }))
    .on(loadSongsFx.doneData, (state, payload) => update(state, {
      byId: {
        $merge: keyBy(payload, 'id'),
      }
    }))
    .on(deleteSongFx.doneData, (state, payload) => update(state, {
      byId: {
        $unset: [payload.id],
      }
    }))
    .on(logout, () => initialState);

export const updateSearchQuery = createEvent<string>();
    
export const $songSearchQuery = createStore<string>('')
    .on(updateSearchQuery, (_, nextValue) => nextValue)
    .on(logout, () => '');