export interface IAccountDTO {
    name: string;
    email: string;
    password: string;
    cash: number;
}

export interface IAccountRecordDTO extends IAccountDTO {
    id: number;
}

export interface IAuthenticationDTO
    extends Pick<IAccountDTO, 'email' | 'password'> { }

export interface ITokenPayload {
    email: string;
    accountId: number;
}