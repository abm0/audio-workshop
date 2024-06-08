import update from 'immutability-helper';
import { createStore } from 'effector';
import { TracksStore } from './track.types';
import { trackDeleteFx, trackFetchListFx, trackUpdateFx } from './track.effects';
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
    .on(trackFetchListFx.doneData, (state, payload) => update(state, {
      byId: {
        $merge: keyBy(payload, 'id'),
      }
    }))
    .on(trackDeleteFx.doneData, (state, payload) => update(state, {
      byId: {
        $unset: [payload.id],
      }
    }));
