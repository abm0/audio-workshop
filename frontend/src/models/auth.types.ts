export type AuthStore = boolean;

export type AuthRequestPayload = {
    email: string;
    password: string;
}

export type LogoutRequestPayload = {
    refreshToken: string;
}
