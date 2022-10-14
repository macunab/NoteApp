export interface User {
    name?: string;
    email: string;
    password?: string;
    googleId?: string;
}

export interface AuthResponse {
    ok: boolean;
    msg: string;
}

export interface DataResponse<T> {
    ok: boolean;
    msg: string;
    token?: string;
    data?: T;
}