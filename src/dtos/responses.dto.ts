export interface Response<T> {
    status: string,
    message: string,
    body?: T,
    token?: string
}