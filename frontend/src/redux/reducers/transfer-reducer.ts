import {Transfer, TransferError} from "../../types/types";
import {
    TRANSFER_ADDED_SUCCESS,
    TRANSFER_ADDED_FAILURE,
    FETCH_TRANSFER_SUCCESS,
    FETCH_ACCOUNT_TRANSFERS_SUCCESS,
    TransferActionTypes,
    FETCH_USER_TRANSFERS_SUCCESS
} from "../action-types/transfer-action-types";

import { SHOW_LOADER } from "../action-types/auth-action-types";
import { ACTIVATE_ACCOUNT_SUCCESS } from "../action-types/account-action-types";

export type InitialStateType = {
    transfers: Array<Transfer>,
    transfer: Partial<Transfer>,
    error: Partial<TransferError>,
    loading: boolean
};

const initialState: InitialStateType = {
    transfers: [],
    transfer: {},
    error: {},
    loading: false
};

const reducer = (state: InitialStateType = initialState, action: TransferActionTypes): InitialStateType => {

    switch (action.type) {
        case SHOW_LOADER:
            return {...state, loading:true }

        case FETCH_TRANSFER_SUCCESS:
            return {...state, transfer: action.payload, loading: false};

        case TRANSFER_ADDED_FAILURE:
            return {...state, error: action.payload, loading: false};

        case TRANSFER_ADDED_SUCCESS:
            return {...state, transfer: action.payload, loading: false};

        case FETCH_ACCOUNT_TRANSFERS_SUCCESS:
            return {...state, transfers: action.payload, loading: false};

        case FETCH_USER_TRANSFERS_SUCCESS:
            return {...state, transfers: action.payload, loading: false};

        default:
            return state;
    }
};

export default reducer;
