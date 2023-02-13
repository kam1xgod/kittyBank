import { Account, AccountError, Card } from "../../types/types";
import {
    FETCH_ACCOUNT_SUCCESS,
    ACCOUNT_ADDED_FAILURE,
    ACCOUNT_ADDED_SUCCESS,
    FETCH_USER_ACCOUNTS_SUCCESS,
    AccountActionTypes,
    ACTIVATE_ACCOUNT_SUCCESS,
    ACTIVATE_ACCOUNT_FAILURE,
    ACCOUNT_DELETED_FAILURE,
    ACCOUNT_DELETED_SUCCESS
} from "../action-types/account-action-types";

import { SHOW_LOADER } from "../action-types/auth-action-types";

export type InitialStateType = {
    accounts: Array<Account>,
    account: Partial<Account>,
    error: string,
    errors: string,
    success: string,
    message: string,
    loading: boolean
};

const initialState: InitialStateType = {
    accounts: [],
    account: {},
    error: "",
    errors: "",
    success: "",
    message: "",
    loading: false
};

const reducer = (state: InitialStateType = initialState, action: AccountActionTypes): InitialStateType => {

    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, loading: true }

        case FETCH_ACCOUNT_SUCCESS:
            return { ...state, account: action.payload, loading: false };

        case ACCOUNT_ADDED_FAILURE:
            return { ...state, error: action.payload };

        case ACCOUNT_ADDED_SUCCESS:
            return { ...state, account: action.payload, loading: false };

        case ACCOUNT_DELETED_FAILURE:
            return { ...state, error: action.payload };

        case ACCOUNT_DELETED_SUCCESS:
            return { ...state, message: action.payload, loading: false };

        case FETCH_USER_ACCOUNTS_SUCCESS:
            return { ...state, accounts: action.payload, loading: false };

        case ACTIVATE_ACCOUNT_SUCCESS:
            return { ...state, success: action.payload };

        case ACTIVATE_ACCOUNT_FAILURE:
            return { ...state, errors: action.payload };

        default:
            return state;
    }
};

export default reducer;
