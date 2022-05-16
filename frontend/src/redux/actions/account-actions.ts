import {Account, AccountError} from "../../types/types";
import {
    FETCH_ACCOUNT_SUCCESS,
    FETCH_USER_ACCOUNTS_SUCCESS,
    ACCOUNT_ADDED_SUCCESS,
    ACCOUNT_ADDED_FAILURE,
    FetchAccountSuccessActionType,
    AccountAddedFailureActionType,
    AccountAddedSuccessActionType,
    FetchUserAccountsActionType,
    ActivateAccountSuccessActionType,
    ActivateAccountFailureActionType,
    ACTIVATE_ACCOUNT_SUCCESS,
    ACTIVATE_ACCOUNT_FAILURE
} from "../action-types/account-action-types";

export const fetchAccountSuccess = (account: Account): FetchAccountSuccessActionType => ({
    type: FETCH_ACCOUNT_SUCCESS,
    payload: account
});

export const accountAddedSuccess = (account: Account): AccountAddedSuccessActionType => ({
    type: ACCOUNT_ADDED_SUCCESS,
    payload: account
});

export const accountAddedFailure = (error: AccountError): AccountAddedFailureActionType => ({
    type: ACCOUNT_ADDED_FAILURE,
    payload: error
});

export const fetchUserAccountsSuccess = (accounts: Array<Account>): FetchUserAccountsActionType => ({
    type: FETCH_USER_ACCOUNTS_SUCCESS,
    payload: accounts
});

export const activateAccountSuccess = (message: string): ActivateAccountSuccessActionType => ({
    type: ACTIVATE_ACCOUNT_SUCCESS,
    payload: message
});

export const activateAccountFailure = (error: string): ActivateAccountFailureActionType => ({
    type: ACTIVATE_ACCOUNT_FAILURE,
    payload: error
});