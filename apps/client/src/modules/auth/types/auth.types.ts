export interface Login {
    email:  string,
    password: string
}

export interface Register extends Login {
    username: string
}

export interface Response<T> {
    message: string
    data: T,
    success: boolean
}

export interface User {
    id: string,
    email: string,
    username: string,
    role: string,
    token?: string
    profile?: string
}