import { Account, AccountError } from "../../types/types";
import { ShowLoaderActionType } from "./auth-action-types";

export const FETCH_ACCOUNT_SUCCESS = "FETCH_PERFUME_SUCCESS";
export const ACCOUNT_ADDED_SUCCESS = "ACCOUNT_ADDED_SUCCESS";
export const ACCOUNT_ADDED_FAILURE = "ACCOUNT_ADDED_FAILURE";
export const ACCOUNT_DELETED_SUCCESS = "ACCOUNT_DELETED_SUCCESS";
export const ACCOUNT_DELETED_FAILURE = "ACCOUNT_DELETED_FAILURE";
export const FETCH_USER_ACCOUNTS_SUCCESS = "FETCH_ALL_ACCOUNTS_SUCCESS";
export const ACTIVATE_ACCOUNT_SUCCESS = "ACTIVATE_ACCOUNT_SUCCESS";
export const ACTIVATE_ACCOUNT_FAILURE = "ACTIVATE_ACCOUNT_FAILURE";

export type FetchAccountSuccessActionType = { type: typeof FETCH_ACCOUNT_SUCCESS, payload: Account };
export type AccountAddedSuccessActionType = { type: typeof ACCOUNT_ADDED_SUCCESS, payload: Account };
export type AccountAddedFailureActionType = { type: typeof ACCOUNT_ADDED_FAILURE, payload: string };
export type AccountDeletedSuccessActionType = { type: typeof ACCOUNT_DELETED_SUCCESS, payload: string };
export type AccountDeletedFailureActionType = { type: typeof ACCOUNT_DELETED_FAILURE, payload: string };
export type FetchUserAccountsActionType = { type: typeof FETCH_USER_ACCOUNTS_SUCCESS, payload: Array<Account> };
export type ActivateAccountSuccessActionType = { type: typeof ACTIVATE_ACCOUNT_SUCCESS, payload: string };
export type ActivateAccountFailureActionType = { type: typeof ACTIVATE_ACCOUNT_FAILURE, payload: string };

export type AccountActionTypes = FetchAccountSuccessActionType | AccountAddedSuccessActionType |
    AccountAddedFailureActionType | FetchUserAccountsActionType | ShowLoaderActionType |
    ActivateAccountSuccessActionType | ActivateAccountFailureActionType | AccountDeletedSuccessActionType | AccountDeletedFailureActionType;
