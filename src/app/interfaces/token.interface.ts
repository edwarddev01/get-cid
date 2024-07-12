export interface Itoken {
    status: string,
    token: string,
    valid: number
}

export interface IGToken{
    valid: number
}

export interface Itokens {
    id: number,
    token: string,
    status: boolean,
    valid:number,
    createdAt: string
}