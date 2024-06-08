import axios from 'axios';
import { ApiPathNames, apiPaths } from '../shared/constants';
import { getAuthHeaders } from '../shared/utils';
import { TrackUpdatePayload, TrackUpdateResponse } from '../models/track.types';

export const updateTrack = async (payload: TrackUpdatePayload): Promise<TrackUpdateResponse> => {
  try {
    const config = {
      headers: getAuthHeaders(),
    };

    const requestPayload = {
      id: payload.id,
      user_id: payload.userId,
      title: payload.title
    };

    const response = await axios.post(apiPaths.getPath(ApiPathNames.TRACK_UPDATE), requestPayload, config);
    
    return response.data.payload;
  } catch (e) {
    throw new Error('Ошибка при обновлении трека')
  }
};

export const uploadTrack = async (payload: FormData) => {
  try {
    const config = {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'multipart/form-data'
      },
    };

    const response = await axios.post(apiPaths.getPath(ApiPathNames.TRACK_UPLOAD), payload, config);

    return response.data.payload;
  } catch (e) {
    throw new Error('Ошибка при загрузке файла')
  }
};

export const fetchTracksList = async () => {
  try {
    const config = {
      headers: getAuthHeaders(),
    };

    const response = await axios.get(apiPaths.getPath(ApiPathNames.TRACKS_LIST), config);

    return response.data.payload;
  } catch(e) {
    throw new Error('Ошибка при загрузке списка треков пользователя')
  } 
};
