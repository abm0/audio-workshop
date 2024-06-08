
import axios from 'axios';
import { ACCESS_TOKEN_LS_KEY, ApiPathNames, apiPaths } from '../shared/constants';
import { AuthPayload, LogoutPayload } from '../models/auth.types';

export const authUser = async (payload: AuthPayload) => {
  try {
    const { data } = await axios.post(apiPaths.getPath(ApiPathNames.SIGNIN), payload);
    
    return data.payload;
  } catch (e) {
    throw new Error('Authentication error');
  }
};

export const logout = async (payload: LogoutPayload) => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN_LS_KEY)}`
      },
    };

    const requestPayload = {
      refresh_token: payload.refreshToken,
    }
    
    await axios.post(apiPaths.getPath(ApiPathNames.LOGOUT), requestPayload, config);
  } catch (e) {
    throw new Error('Logout error');
  }
};
