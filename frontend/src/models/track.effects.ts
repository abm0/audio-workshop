import { createEffect } from "effector";
import * as trackApi from '../api/track';
import { Track, TrackDeletePayload, TrackUpdatePayload } from "./track.types";


export const trackUpdateFx = createEffect(async (payload: TrackUpdatePayload) => {
  try {
    return await trackApi.updateTrack(payload);
  } catch(e) {
    throw e;
  }
});


export const trackFetchListFx = createEffect(async (): Promise<Track[]> => {
  try {
    return await trackApi.fetchTracksList();
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
