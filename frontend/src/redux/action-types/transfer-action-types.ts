import { Transfer, TransferError } from "../../types/types";
import { showLoader } from "../actions/auth-actions";
import { ShowLoaderActionType } from "./auth-action-types";

export const FETCH_ACCOUNT_TRANSFERS_SUCCESS = "FETCH_ACCOUNT_TRANSFERS_SUCCESS";
export const FETCH_USER_TRANSFERS_SUCCESS = "FETCH_USER_TRANSFERS_SUCCESS";
export const TRANSFER_ADDED_FAILURE = "TRANSFER_ADDED_FAILURE";
export const TRANSFER_ADDED_SUCCESS = "TRANSFER_ADDED_SUCCESS";
export const FETCH_TRANSFER_SUCCESS = "FETCH_TRANSFER_SUCCESS";

export type FetchAccountTransfersSuccessActionType = { type: typeof FETCH_ACCOUNT_TRANSFERS_SUCCESS, payload: Array<Transfer> };
export type FetchUserTransfersSuccessActionType = { type: typeof FETCH_USER_TRANSFERS_SUCCESS, payload: Array<Transfer> };
export type FetchTransferSuccessActionType = { type: typeof FETCH_TRANSFER_SUCCESS, payload: Transfer };
export type TransferAddedSuccessActionType = { type: typeof TRANSFER_ADDED_SUCCESS, payload: Transfer };
export type TransferAddedFailureActionType = { type: typeof TRANSFER_ADDED_FAILURE, payload: TransferError };

export type TransferActionTypes = FetchAccountTransfersSuccessActionType | FetchTransferSuccessActionType |
    TransferAddedFailureActionType | TransferAddedSuccessActionType |
    FetchUserTransfersSuccessActionType | ShowLoaderActionType;