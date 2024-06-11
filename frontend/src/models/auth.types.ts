export type AuthStore = boolean;

export type LoginRequestPayload = {
    email: string;
    password: string;
}

export type RegisterRequestPayload = {
    name: string;
    email: string;
    password: string;
}

export type LogoutRequestPayload = {
    refreshToken: string;
}

export type RefreshRequestPayload = {
    refreshToken: string;
};
