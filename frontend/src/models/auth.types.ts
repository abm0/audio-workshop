export type AuthStore = boolean;

export type AuthPayload = {
    email: string;
    password: string;
}

export type LogoutPayload = {
    refreshToken: string;
}