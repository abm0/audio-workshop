import { createEffect } from "effector";
import * as trackApi from '../api/track';
import { Track, TrackDeletePayload, TrackUpdatePayload } from "./track.types";


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


export const trackFetchListFx = createEffect(async (): Promise<Track[]> => {
  try {
    const result = await trackApi.fetchTracksList();

    return result;
  } catch(e) {
    throw e;
  }
});

export const trackDeleteFx = createEffect(async (payload: TrackDeletePayload) => {
  try {
    await trackApi.deleteTrack(payload);

    return payload;
  } catch (e) {
    throw e;
  }
});
