export interface User {
    name?: string;
    username: string;
    password?: string;
    active?:boolean;
}

export interface AuthResponse {
    ok: boolean;
    msg: string;
}