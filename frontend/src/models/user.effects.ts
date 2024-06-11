import { createEffect } from "effector";
import * as userApi from '../api/user';
import { AxiosError } from "axios";
import { requestFailed401 } from "./auth.events";

export const loadProfileFx = createEffect(async () => {
  try {
    return await userApi.loadProfile();
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      if (e.response.status === 401) {
        requestFailed401();
      }
    }

    throw e;
  }
});

loadProfileFx();