import { Itokens } from "./token.interface";

export interface Irecord {
    id:number,
    iid:string,
    cid:string,
    token: Itokens
    createdAt: string
}