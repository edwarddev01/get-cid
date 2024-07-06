export interface Ilogin {
    email: string,
    password: string
}

export interface Iresponse {
    status: string,
    message: string,
    recaptchaToken: string
}