import axios from 'axios';
import { ApiPathNames, apiPaths } from '../shared/constants';
import { getAuthHeaders } from '../shared/utils';
import { SongDeleteRequestPayload } from '../models/song.types';

export const uploadSong = async (payload: FormData) => {
  try {
    const config = {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'multipart/form-data'
      },
    };

    return await axios.post(apiPaths.getPath(ApiPathNames.SONG_INDEX), payload, config);
  } catch (e) {
    throw new Error('Ошибка при загрузке файла')
  }
};

export const fetchSongs = async () => {
  try {
    const config = {
      headers: getAuthHeaders(),
    };

    return await axios.get(apiPaths.getPath(ApiPathNames.SONG_INDEX), config);
  } catch(e) {
    throw new Error('Ошибка при загрузке списка треков пользователя')
  } 
};

export const deleteSong = async (payload: SongDeleteRequestPayload) => {
  try {
    const config = {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'multipart/form-data'
      },
    };

    return await axios.delete(`${apiPaths.getPath(ApiPathNames.SONG_INDEX)}?id=${payload.id}`, config)
  } catch (error) {
    throw new Error('Ошибка при удалении трека')
  }
};
