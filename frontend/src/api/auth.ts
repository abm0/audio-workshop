
import axios from 'axios';
import { ACCESS_TOKEN_LS_KEY, ApiPathNames, apiPaths } from '../shared/constants';
import { AuthRequestPayload, LogoutRequestPayload } from '../models/auth.types';
import { getAuthHeaders } from '../shared/utils';

export const authUser = async (payload: AuthRequestPayload) => {
  try {
    const { data } = await axios.post(apiPaths.getPath(ApiPathNames.SIGNIN), payload);
    
    return data.payload;
  } catch (e) {
    throw new Error('Authentication error');
  }
};

export const logout = async (payload: LogoutRequestPayload) => {
  try {
    const config = {
      headers: getAuthHeaders(),
    };

    const requestPayload = {
      refresh_token: payload.refreshToken,
    }
    
    await axios.post(apiPaths.getPath(ApiPathNames.LOGOUT), requestPayload, config);
  } catch (e) {
    throw new Error('Logout error');
  }
};
