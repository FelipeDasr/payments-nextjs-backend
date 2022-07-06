export interface IAccountMovementDTO {
    amount: number;
}

export enum AccountMovementType {
    cashwithdrawal,
    deposit
}