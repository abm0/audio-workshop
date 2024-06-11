import update from 'immutability-helper';
import { createEvent, createStore } from 'effector';
import { TracksStore } from './track.types';
import { trackDeleteFx, trackFetchListFx, trackProcessFx } from './track.effects';
import { keyBy } from 'lodash';
import { logout } from './auth.events';

const initialState = {
  byId: {}
}

export const $tracks = createStore<TracksStore>(initialState)
    .on(trackProcessFx.doneData, (state, payload) => update(state, {
      byId: {
        [payload.id]: {
          $set: payload
        }
      }
    }))
    .on(trackFetchListFx.doneData, (state, payload) => update(state, {
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
    
export const $trackSearchQuery = createStore<string>('')
    .on(updateSearchQuery, (_, nextValue) => nextValue)
    .on(logout, () => '');