import { createEffect } from "effector";
import { LoginRequestPayload, RegisterRequestPayload } from "./auth.types";
import * as authApi from '../api/auth';
import { ACCESS_TOKEN_LS_KEY, REFRESH_TOKEN_LS_KEY } from "../shared/constants";
import { login, logout } from "./auth.events";

export const loginFx = createEffect(async (payload: LoginRequestPayload) => {
  try {
    const result = await authApi.login(payload);

      const { access_token, refresh_token, email, id } = result;
      
      localStorage.setItem(ACCESS_TOKEN_LS_KEY, access_token);
      localStorage.setItem(REFRESH_TOKEN_LS_KEY, refresh_token)

      login();
      
      return {
        email, 
        id
      };
  } catch(e) {
    throw e;
  }
});

export const signupFx = createEffect(async (payload: RegisterRequestPayload) => {
  try {
    await authApi.signup(payload);
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
    localStorage.removeItem(REFRESH_TOKEN_LS_KEY);
  } catch(e) {    
    throw e;
  }
});

export const refreshTokenFx = createEffect(async () => {
  try {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_LS_KEY);
    
    if (!refreshToken) throw new Error('Отсутствует refresh token');

    const token = await authApi.refresh({ refreshToken });

    return token;
  } catch(e) {
    localStorage.removeItem(ACCESS_TOKEN_LS_KEY);
    localStorage.removeItem(REFRESH_TOKEN_LS_KEY);

    logout();
  }
});
