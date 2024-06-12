import { createEffect } from "effector";
import * as userApi from '../api/user';
import { handleUnauthorizedError } from "../shared/utils";

export const loadProfileFx = createEffect(async () => {
  try {
    return await userApi.loadProfile();
  } catch (e) {
    if (handleUnauthorizedError(e)) return;

    throw e;
  }
});

loadProfileFx();