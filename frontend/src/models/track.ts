import update from 'immutability-helper';
import { createEffect, createStore } from 'effector';
import { TracksStore, TrackUpdatePayload } from './track.types';
import * as trackApi from '../api/track';

export const trackUpdateFx = createEffect(async (payload: TrackUpdatePayload) => {
  try {
    const result = await trackApi.updateTrack(payload);

      const { id, title } = result;
      
      return {
        id,
        title 
      };
  } catch(e) {
    throw e;
  }
});


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
    }));
