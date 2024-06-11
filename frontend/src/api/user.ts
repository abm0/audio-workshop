import axios from "axios";
import { getAuthHeaders } from "../shared/utils";
import { ApiPathNames, apiPaths } from "../shared/constants";

export const loadProfile = async () => {
  const config = {
    headers: getAuthHeaders(),
  };

  try {
    const response = await axios.get(apiPaths.getPath(ApiPathNames.USER_DETAILS), config)
    
    return response.data.payload;
  } catch (e) {
    throw e;
  }
};
