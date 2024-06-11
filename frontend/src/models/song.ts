import update from 'immutability-helper';
import { createEvent, createStore } from 'effector';
import { SongsStore } from './song.types';
import { trackDeleteFx, songsFetchFx, songUploadFx } from './song.effects';
import { keyBy } from 'lodash';
import { logout } from './auth.events';

const initialState = {
  byId: {}
}

export const $songs = createStore<SongsStore>(initialState)
    .on(songUploadFx.doneData, (state, payload) => update(state, {
      byId: {
        [payload.id]: {
          $set: payload
        }
      }
    }))
    .on(songsFetchFx.doneData, (state, payload) => update(state, {
      byId: {
        $merge: keyBy(payload, 'id'),
      }
    }))
    .on(trackDeleteFx.doneData, (state, payload) => update(state, {
      byId: {
        $unset: [payload.id],
      }
    }))
    .on(logout, () => initialState);

export const updateSearchQuery = createEvent<string>();
    
export const $songSearchQuery = createStore<string>('')
    .on(updateSearchQuery, (_, nextValue) => nextValue)
    .on(logout, () => '');