import { ACCESS_TOKEN_LS_KEY, ApiPathNames, apiPaths } from "./constants";

export const getAuthHeaders = () => (
  {
    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN_LS_KEY)}`
  }
);

export const getSongUrl = (songPath?: string) => {
  if (songPath == null) return;
  
  return `${apiPaths.getPath(ApiPathNames.MEDIA)}${songPath}`;
}

export const trimExtension = (path: string) => path.replace(/\.[^/.]+$/, "");