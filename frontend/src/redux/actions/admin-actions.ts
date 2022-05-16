import {Account, User, Transfer, Credit, SavingPlan, CreditRequest} from "../../types/types";
import {
    FETCH_ALL_USERS_SUCCESS,
    FETCH_USER_INFO_SUCCESS,
    FETCH_USER_ACCOUNTS_SUCCESS,
    FETCH_ALL_ACCOUNTS_SUCCESS,
    FETCH_ACCOUNT_INFO_SUCCESS,
    FORM_RESET,
    LOADING_DATA,
    GetAllUsersActionType,
    GetUserInfoActionType,
    GetUserAccountsActionType,
    GetAccountTransfersActionType,
    GetAllAccountsActionType,
    GetAccountInfoActionType,
    ResetActionType,
    LoadingDataActionType,
    FETCH_ACCOUNT_TRANSFERS_SUCCESS,
    GetAllTransfersActionType,
    FETCH_ALL_TRANSFERS_SUCCESS,
    GetAllCreditsActionType,
    FETCH_ALL_CREDITS_SUCCESS,
    GetCreditInfoActionType,
    FETCH_CREDIT_INFO_SUCCESS,
    GetAllSavingPlansActionType,
    FETCH_SAVING_PLAN_INFO_SUCCESS,
    FETCH_ALL_SAVING_PLANS_SUCCESS,
    GetSavingPlanInfoActionType,
    GetAllCreditRequestsActionType,
    FETCH_ALL_CREDIT_REQUESTS_SUCCESS,
} from "../action-types/admin-action-types";

export const loadingData = (): LoadingDataActionType => ({
    type: LOADING_DATA
});

export const getUserAccounts = (accounts: Array<Account>): GetUserAccountsActionType => ({
    type: FETCH_USER_ACCOUNTS_SUCCESS,
    payload: accounts
});

export const getAllUsers = (users: Array<User>): GetAllUsersActionType => ({
    type: FETCH_ALL_USERS_SUCCESS,
    payload: users
});

export const getUserInfo = (user: User): GetUserInfoActionType => ({
    type: FETCH_USER_INFO_SUCCESS,
    payload: user
});

export const getAllAccounts = (accounts: Array<Account>): GetAllAccountsActionType => ({
    type: FETCH_ALL_ACCOUNTS_SUCCESS,
    payload: accounts
});

export const getAccountTransfers = (transfers: Array<Transfer>): GetAccountTransfersActionType => ({
    type: FETCH_ACCOUNT_TRANSFERS_SUCCESS,
    payload: transfers
});

export const getAllTransfers = (transfers: Array<Transfer>): GetAllTransfersActionType => ({
    type: FETCH_ALL_TRANSFERS_SUCCESS,
    payload: transfers
})

export const getAccountInfo = (account: Account): GetAccountInfoActionType => ({
    type: FETCH_ACCOUNT_INFO_SUCCESS,
    payload: account
});

export const getAllCredits = (credits: Array<Credit>): GetAllCreditsActionType => ({
    type: FETCH_ALL_CREDITS_SUCCESS,
    payload: credits
});

export const getCreditInfo = (credit: Credit): GetCreditInfoActionType => ({
    type: FETCH_CREDIT_INFO_SUCCESS,
    payload: credit
});

export const getAllCreditRequests = (requests: Array<CreditRequest>): GetAllCreditRequestsActionType => ({
    type: FETCH_ALL_CREDIT_REQUESTS_SUCCESS,
    payload: requests
});

export const getAllSavingPlans = (savingPlans: Array<SavingPlan>): GetAllSavingPlansActionType => ({
    type: FETCH_ALL_SAVING_PLANS_SUCCESS,
    payload: savingPlans
});

export const getSavingPlanInfo = (savingPlan: SavingPlan): GetSavingPlanInfoActionType => ({
    type: FETCH_SAVING_PLAN_INFO_SUCCESS,
    payload: savingPlan
});

export const reset = (): ResetActionType => ({
    type: FORM_RESET
});
