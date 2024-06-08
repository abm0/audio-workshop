import axios from 'axios';
import { ApiPathNames, apiPaths } from '../shared/constants';
import { getAuthHeaders } from '../shared/utils';

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
