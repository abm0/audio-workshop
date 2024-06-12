import { createEffect } from "effector";
import * as trackApi from '../api/song';
import { Song, SongDeleteRequestPayload, SongUploadFxPayload, } from "./song.types";
import { handleUnauthorizedError } from "../shared/utils";


export const uploadSongFx = createEffect(async (payload: SongUploadFxPayload) => {
  const formData = new FormData();
  
  formData.append('title', payload.title);
  formData.append('source_file', payload.sourceFile);
    
  try {
    const response = await trackApi.uploadSong(formData);

    return response.data.payload;
  } catch(e) {
    if (handleUnauthorizedError(e)) return;

    throw e;
  }
});


export const loadSongsFx = createEffect(async (): Promise<Song[]> => {
  try {
    const response = await trackApi.fetchSongs();

    return response.data.payload;
  } catch(e) {
    throw e;
  }
});

loadSongsFx();

export const deleteSongFx = createEffect(async (payload: SongDeleteRequestPayload) => {
  try {
    const response = await trackApi.deleteSong(payload);

    return response.data.payload;
  } catch (e) {
    if (handleUnauthorizedError(e)) return;

    throw e;
  }
});
