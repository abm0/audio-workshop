import { createEffect} from "effector";
import { AuthPayload, LogoutPayload } from "./auth.types";
import * as authApi from '../api/authUser';
import { ACCESS_TOKEN_LS_KEY, REFRESH_TOKEN_LS_KEY } from "../shared/constants";

export const loginFx = createEffect(async (payload: AuthPayload) => {
  try {
    const result = await authApi.authUser(payload);

      const { access_token, refresh_token, email, id } = result;
      
      localStorage.setItem(ACCESS_TOKEN_LS_KEY, access_token);
      localStorage.setItem(REFRESH_TOKEN_LS_KEY, refresh_token)

      return {
        email, 
        id
      };
  } catch(e) {
    throw e;
  }
});

export const logoutFx = createEffect(async () => {
  try {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_LS_KEY);

    if (!refreshToken) throw new Error('Отсутствует refresh token');
    
    await authApi.logout({ refreshToken });
      
    localStorage.removeItem(ACCESS_TOKEN_LS_KEY);
    localStorage.removeItem(REFRESH_TOKEN_LS_KEY)
  } catch(e) {
    throw e;
  }
});