import axios from 'axios';
import { ApiPathNames, apiPaths } from '../shared/constants';
import { getAuthHeaders } from '../shared/utils';
import { UpdateTrackPayload } from '../models/track.types';

export const updateTrack = async (payload: UpdateTrackPayload) => {
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

    console.log(response.data);
    
    return response.data.payload;
  } catch (e) {
    throw new Error('Ошибка при загрузке файла')
  }
};
