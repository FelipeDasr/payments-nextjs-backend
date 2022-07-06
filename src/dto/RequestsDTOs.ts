import { IAuthenticationDTO, IAccountDTO } from "./AccountDTOs";
import { IAccountMovementDTO } from "./AccountMovementDTOs";
import { NextApiRequest } from "next";
import { INewTransferDTO } from "./TransferDTOs";

export interface ICreateAccountRequestDTO extends NextApiRequest {
    body: IAccountDTO
}

export interface IAuthenticationRequestDTO extends NextApiRequest {
    body: IAuthenticationDTO
}

export interface IAuthenticatedRequestDTO extends NextApiRequest {
    locals: {
        accountId: number,
        cash: number
    }
}

export interface IAccountMovementRequestDTO extends IAuthenticatedRequestDTO {
    body: IAccountMovementDTO;
}

export interface INewTransferRequestDTO extends IAuthenticatedRequestDTO { 
    body: INewTransferDTO
}