
import axios from 'axios';
import { API_HOST, apiPaths } from '../shared/constants';
import { AuthPayload } from '../models/auth.types';

export const authUser = async (payload: AuthPayload) => {
  try {
    const { data } = await axios.post(`${API_HOST}${apiPaths.SIGNIN}`, payload);
    
    return {
      success: data.success,
      email: data.email,
      token: data.token,
    };
  } catch (e) {
    throw new Error('Authentication error')
  }
};