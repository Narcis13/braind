export type Token = {
    type:string;
    token:string;
    expires_at:string;
};

export type UserPayload = {
    id:number;
    email:string;
    created_at:string;
    updated_at:string;
    numeintreg:string;
    rol:string;
    stare:string;
    token:Token;
}