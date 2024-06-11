import { createEffect } from "effector";
import * as trackApi from '../api/song';
import { Song, SongDeleteRequestPayload, SongUploadFxPayload, } from "./song.types";


export const songUploadFx = createEffect(async (payload: SongUploadFxPayload) => {
  const formData = new FormData();
  
  formData.append('title', payload.title);
  formData.append('source_file', payload.sourceFile);
    
  try {
    const data = await trackApi.uploadSong(formData);

    return data.payload;
  } catch(e) {
    throw e;
  }
});


export const songsFetchFx = createEffect(async (): Promise<Song[]> => {
  try {
    return await trackApi.fetchSongs();
  } catch(e) {
    throw e;
  }
});

export const trackDeleteFx = createEffect(async (payload: SongDeleteRequestPayload) => {
  try {
    await trackApi.deleteSong(payload);

    return payload;
  } catch (e) {
    throw e;
  }
});
