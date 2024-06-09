import { ACCESS_TOKEN_LS_KEY, ApiPathNames, apiPaths } from "./constants";

export const getAuthHeaders = () => (
  {
    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN_LS_KEY)}`
  }
);

export const getTrackUrl = (trackPath?: string) => {
  if (trackPath == null) return;
  
  return `${apiPaths.getPath(ApiPathNames.MEDIA)}${trackPath}`;
}

export const trimExtension = (path: string) => path.replace(/\.[^/.]+$/, "");