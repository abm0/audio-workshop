export const API_HOST = 'http://127.0.0.1:8000';

export enum ApiPathNames {
    SIGNUP,
    SIGNIN,
    LOGOUT,
    REFRESH,
    USER_DETAILS,
    SONG_INDEX,
    MEDIA,
}

/**
 * Список эндпоинтов на сервере
 */
export const apiPaths = {
    [ApiPathNames.SIGNUP]: '/user/signup',
    [ApiPathNames.SIGNIN]: '/user/signin',
    [ApiPathNames.LOGOUT]: '/user/signout',
    [ApiPathNames.REFRESH]: '/user/refresh',
    [ApiPathNames.USER_DETAILS]: '/user/details',
    [ApiPathNames.SONG_INDEX]: '/song/',
    [ApiPathNames.MEDIA]: '/song/media',

    getPath(key: ApiPathNames) {
        return `${API_HOST}${this[key]}`
    }
};

/**
 * Список путей для клиентского роутинга
 */
export const AUTH_PATH = '/auth';
export const REGISTER_PATH = `${AUTH_PATH}/register`
export const MAIN_PATH = '/main';

/**
 * Ключи для хранения токенов в local storage
 */
export const ACCESS_TOKEN_LS_KEY = 'audio-utils-app-access-token';
export const REFRESH_TOKEN_LS_KEY = 'audio-utils-app-refresh-token';

export const LANGUAGE_LS_KEY = 'audio-utils-app-language'; 


export const EVENT_PLAY_START = 'event-play-start';
