import { IAuthenticationDTO, IAccountDTO } from "./AccountDTOs";
import { IAccountMovementDTO } from "./AccountMovementDTOs";
import { IQueryDTO } from "./QueryDTOs";
import { NextApiRequest } from "next";

export interface ICreateAccountRequestDTO extends NextApiRequest {
    body: IAccountDTO
}

export interface IAuthenticationRequestDTO extends NextApiRequest {
    body: IAuthenticationDTO
}

export interface IAuthenticatedRequestDTO extends NextApiRequest {
    locals: {
        accountId: number
    }
}

export interface IAccountMovementRequestDTO extends IAuthenticatedRequestDTO {
    body: IAccountMovementDTO;
}