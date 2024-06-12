import { AxiosError } from "axios";
import { requestFailed401 } from "../models/auth.events";
import { ACCESS_TOKEN_LS_KEY } from "./constants";

export const getAuthHeaders = () => (
  {
    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN_LS_KEY)}`
  }
);

export const trimExtension = (path: string) => path.replace(/\.[^/.]+$/, "");

export const handleUnauthorizedError = (e: unknown) => {
  if (e instanceof AxiosError && e.response) {
    if (e.response.status === 401) {
      requestFailed401();
      return true;
    }
  }

  return false;
} 