import { createEffect } from "effector";
import * as trackApi from '../api/track';
import { Track, TrackDeletePayload, TrackUpdatePayload } from "./track.types";


export const trackProcessFx = createEffect(async (payload: TrackUpdatePayload) => {
  try {
    const data = await trackApi.updateTrack(payload);

    return await trackApi.processTrack({ id: data.id })
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
