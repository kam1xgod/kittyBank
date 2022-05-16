import {Account, User, Transfer, Credit, SavingPlan, CreditRequest} from "../../types/types";

export const LOADING_DATA = "LOADING_DATA";
export const FETCH_ALL_USERS_ACCOUNTS_SUCCESS = "FETCH_ALL_USERS_ACCOUNTS_SUCCESS";
export const FETCH_USER_ACCOUNTS_SUCCESS = "FETCH_USER_ACCOUNTS_SUCCESS";
export const FETCH_ALL_USERS_SUCCESS = "FETCH_ALL_USERS_SUCCESS";
export const FETCH_USER_INFO_SUCCESS = "FETCH_USER_INFO_SUCCESS";
export const FETCH_ACCOUNT_TRANSFERS_SUCCESS = "FETCH_ACCOUNT_TRANSFERS_SUCCESS";
export const FETCH_ALL_TRANSFERS_SUCCESS = "FETCH_ALL_TRANSFERS_SUCCESS";
export const FETCH_ALL_ACCOUNTS_SUCCESS = "FETCH_ALL_ACCOUNTS_SUCCESS";
export const FETCH_ACCOUNT_INFO_SUCCESS = "FETCH_ACCOUNT_INFO_SUCCESS";
export const FETCH_ALL_CREDITS_SUCCESS = "FETCH_ALL_CREDITS_SUCCESS";
export const FETCH_CREDIT_INFO_SUCCESS = "FETCH_CREDIT_INFO_SUCCESS";
export const FETCH_ALL_CREDIT_REQUESTS_SUCCESS = "FETCH_ALL_CREDIT_REQUESTS_SUCCESS";
export const FETCH_ALL_SAVING_PLANS_SUCCESS = "FETCH_ALL_SAVING_PLANS_SUCCESS";
export const FETCH_SAVING_PLAN_INFO_SUCCESS = "FETCH_SAVING_PLAN_INFO_SUCCESS";
export const FORM_RESET = "FORM_RESET";

export type LoadingDataActionType = { type: typeof LOADING_DATA };
export type GetAllUsersAccountsActionType = { type: typeof FETCH_ALL_USERS_ACCOUNTS_SUCCESS, payload: Array<Account> };
export type GetUserAccountsActionType = { type: typeof FETCH_USER_ACCOUNTS_SUCCESS, payload: Array<Account> };
export type GetAllUsersActionType = { type: typeof FETCH_ALL_USERS_SUCCESS, payload: Array<User> };
export type GetUserInfoActionType = { type: typeof FETCH_USER_INFO_SUCCESS, payload: User };
export type GetAccountTransfersActionType = { type: typeof FETCH_ACCOUNT_TRANSFERS_SUCCESS, payload: Array<Transfer>}
export type GetAllTransfersActionType = { type: typeof FETCH_ALL_TRANSFERS_SUCCESS, payload: Array<Transfer>}
export type GetAllAccountsActionType = { type: typeof FETCH_ALL_ACCOUNTS_SUCCESS, payload: Array<Account> };
export type GetAccountInfoActionType = { type: typeof FETCH_ACCOUNT_INFO_SUCCESS, payload: Account}
export type GetAllCreditsActionType = { type: typeof FETCH_ALL_CREDITS_SUCCESS, payload: Array<Credit> }
export type GetCreditInfoActionType = { type: typeof FETCH_CREDIT_INFO_SUCCESS, payload: Credit }
export type GetAllCreditRequestsActionType = { type: typeof FETCH_ALL_CREDIT_REQUESTS_SUCCESS, payload: Array<CreditRequest>}
export type GetAllSavingPlansActionType = { type: typeof FETCH_ALL_SAVING_PLANS_SUCCESS, payload: Array<SavingPlan>}
export type GetSavingPlanInfoActionType = { type: typeof FETCH_SAVING_PLAN_INFO_SUCCESS, payload: SavingPlan}
export type ResetActionType = { type: typeof FORM_RESET };

export type AdminActionTypes = LoadingDataActionType | GetAllUsersAccountsActionType |
    GetUserAccountsActionType | GetAllUsersActionType | GetUserInfoActionType | ResetActionType |
    GetAllAccountsActionType | GetAccountTransfersActionType | GetAccountInfoActionType |
    GetAllTransfersActionType | GetAllCreditsActionType | GetCreditInfoActionType |
    GetAllSavingPlansActionType | GetSavingPlanInfoActionType | GetAllCreditRequestsActionType;
