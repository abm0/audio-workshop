import axios from 'axios';
import { ApiPathNames, apiPaths } from '../shared/constants';
import { getAuthHeaders } from '../shared/utils';
import { TrackDeletePayload, TrackProcessPayload, TrackUpdatePayload, TrackUpdateResponse } from '../models/track.types';

export const updateTrack = async (payload: TrackUpdatePayload): Promise<TrackUpdateResponse> => {
  const config = {
    headers: getAuthHeaders(),
  };

  const requestPayload = {
    id: payload.id,
    user_id: payload.userId,
    title: payload.title
  };
  
  try {
    const response = await axios.put(apiPaths.getPath(ApiPathNames.TRACK_MANAGE), requestPayload, config);
    
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

    const response = await axios.post(apiPaths.getPath(ApiPathNames.TRACK_MANAGE), payload, config);

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

export const deleteTrack = async (payload: TrackDeletePayload) => {
  try {
    const config = {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'multipart/form-data'
      },
    };

    await axios.delete(`${apiPaths.getPath(ApiPathNames.TRACK_MANAGE)}?id=${payload.id}`, config)
    
    return true
  } catch (error) {
    throw new Error('Ошибка при удалении трека')
  }
};

export const processTrack = async (payload: TrackProcessPayload) => {
  try {
    const config = {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'multipart/form-data'
      },
    };

    const response = await axios.post(apiPaths.getPath(ApiPathNames.TRACK_PROCESSING), payload, config)
    
    return response.data.payload;
  } catch (error) {
    throw new Error('Ошибка при удалении трека')
  }
};
