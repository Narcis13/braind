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

export type Admininstrator = {
   id:number;
   nume:string;
   cnp:string;
}

export type Firma = {
    id:number;
    denumire:string;
    cui:string;
    judet:string;
    oras :string;
    adresa:string;
    forma_juridica:string;
    capital_social?:number;         
    registru_comert? :string;
    codCAEN?:string;
    logo?:string;
    CIAdministrator?:string;
    CertificatCUI?:string;   
    ActConstitutiv?:string;   
    administratori?: Administrator[];
    created_at?:Date; 
}