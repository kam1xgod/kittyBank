import {Transfer, TransferError} from "../../types/types";
import {
    FETCH_ACCOUNT_TRANSFERS_SUCCESS,
    FETCH_TRANSFER_SUCCESS,
    TRANSFER_ADDED_FAILURE,
    TRANSFER_ADDED_SUCCESS,
    FetchAccountTransfersSuccessActionType,
    FetchTransferSuccessActionType,
    TransferAddedFailureActionType,
    TransferAddedSuccessActionType,
    FetchUserTransfersSuccessActionType,
    FETCH_USER_TRANSFERS_SUCCESS
} from "../action-types/transfer-action-types";

export const fetchTransferSuccess = (transfer: Transfer): FetchTransferSuccessActionType => ({
    type: FETCH_TRANSFER_SUCCESS,
    payload: transfer
});

export const transferAddedSuccess = (transfer: Transfer): TransferAddedSuccessActionType => ({
    type: TRANSFER_ADDED_SUCCESS,
    payload: transfer
});

export const transferAddedFailure = (error: string): TransferAddedFailureActionType => ({
    type: TRANSFER_ADDED_FAILURE,
    payload: error
});

export const fetchAccountTransfersSuccess = (transfers: Array<Transfer>): FetchAccountTransfersSuccessActionType => ({
    type: FETCH_ACCOUNT_TRANSFERS_SUCCESS,
    payload: transfers
});

export const fetchUserTransfersSuccess = (transfers: Array<Transfer>): FetchUserTransfersSuccessActionType => ({
    type: FETCH_USER_TRANSFERS_SUCCESS,
    payload: transfers
})