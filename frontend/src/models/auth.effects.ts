import { createEffect} from "effector";
import { AuthPayload } from "./auth.types";
import * as authApi from '../api/authUser';
import { AUTH_TOKEN_LS_KEY } from "../shared/constants";

export const loginFx = createEffect(async (payload: AuthPayload) => {
  const result = await authApi.authUser(payload);

  if (result.success) {
    const { token } = result;
    
    localStorage.setItem(AUTH_TOKEN_LS_KEY, token);
    return token;
  }

  return result;
});