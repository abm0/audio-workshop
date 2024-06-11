
import axios from 'axios';
import { ApiPathNames, apiPaths } from '../shared/constants';
import { LoginRequestPayload, LogoutRequestPayload, RefreshRequestPayload, RegisterRequestPayload } from '../models/auth.types';
import { getAuthHeaders } from '../shared/utils';

export const login = async (payload: LoginRequestPayload) => {
  try {
    const { data } = await axios.post(apiPaths.getPath(ApiPathNames.SIGNIN), payload);
    
    return data.payload;
  } catch (e) {
    throw e;
  }
};

export const signup = async (payload: RegisterRequestPayload) => {
  try {
    const { data } = await axios.post(apiPaths.getPath(ApiPathNames.SIGNUP), payload);
    
    return data.payload;
  } catch (e) {
    throw e;
  }
};

export const logout = async (payload: LogoutRequestPayload) => {
  const config = {
    headers: getAuthHeaders(),
  };

  const requestPayload = {
    refresh_token: payload.refreshToken,
  }
 
  return await axios.post(apiPaths.getPath(ApiPathNames.LOGOUT), requestPayload, config);
};

export const refresh = async (
  payload: RefreshRequestPayload
) => {
  const config = {
    headers: getAuthHeaders(),
  };

  const requestPayload = {
    refresh_token: payload.refreshToken,
  }

  return await axios.post(apiPaths.getPath(ApiPathNames.REFRESH), requestPayload, config);
};