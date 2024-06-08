import update from 'immutability-helper';
import { createStore } from 'effector';
import { TracksStore } from './track.types';
import { fetchTracksListFx, trackUpdateFx } from './track.effects';
import { keyBy } from 'lodash';

const initialState = {
  byId: {}
}

export const $tracks = createStore<TracksStore>(initialState)
    .on(trackUpdateFx.doneData, (state, payload) => update(state, {
      byId: {
        [payload.id]: {
          $set: payload
        }
      }
    }))
    .on(fetchTracksListFx.doneData, (state, payload) => update(state, {
      byId: {
        $merge: keyBy(payload, 'id'),
      }
    }));
