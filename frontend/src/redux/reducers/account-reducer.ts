import { Account, AccountError, Card } from "../../types/types";
import {
    FETCH_ACCOUNT_SUCCESS,
    ACCOUNT_ADDED_FAILURE,
    ACCOUNT_ADDED_SUCCESS,
    FETCH_USER_ACCOUNTS_SUCCESS,
    AccountActionTypes,
    ACTIVATE_ACCOUNT_SUCCESS,
    ACTIVATE_ACCOUNT_FAILURE
} from "../action-types/account-action-types";

import { SHOW_LOADER } from "../action-types/auth-action-types";

export type InitialStateType = {
    accounts: Array<Account>,
    account: Partial<Account>,
    error: Partial<AccountError>,
    errors: string,
    success: string,
    loading: boolean
};

const initialState: InitialStateType = {
    accounts: [],
    account: {},
    error: {},
    errors: "",
    success: "",
    loading: false
};

const reducer = (state: InitialStateType = initialState, action: AccountActionTypes): InitialStateType => {

    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, loading: true }

        case FETCH_ACCOUNT_SUCCESS:
            return { ...state, account: action.payload, loading: false };

        case ACCOUNT_ADDED_FAILURE:
            return { ...state, error: action.payload, loading: false };

        case ACCOUNT_ADDED_SUCCESS:
            return { ...state, account: action.payload, loading: false };

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
