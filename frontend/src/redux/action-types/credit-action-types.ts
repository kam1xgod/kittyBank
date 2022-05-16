import { Credit, CreditError, CreditRequest } from "../../types/types";
import { ShowLoaderActionType } from "./auth-action-types";

export const FETCH_CREDIT_SUCCESS = "FETCH_CREDIT_SUCCESS";
export const CREDIT_ADDED_SUCCESS = "CREDIT_ADDED_SUCCESS";
export const CREDIT_ADDED_FAILURE = "CREDIT_ADDED_FAILURE";
export const FETCH_USER_CREDITS_SUCCESS = "FETCH_USER_CREDITS_SUCCESS";
export const CREDIT_REQUEST_ADDED_SUCCESS = "CREDIT_REQUEST_ADDED_SUCCESS";
export const FETCH_CREDIT_REQUESTS_SUCCESS = "FETCH_CREDIT_REQUESTS_SUCCESS";
export const CREDIT_REQUEST_DELETED_SUCCESS = "CREDIT_REQUEST_DELETED_SUCCESS";

export type FetchCreditSuccessActionType = { type: typeof FETCH_CREDIT_SUCCESS, payload: Credit };
export type CreditAddedSuccessActionType = { type: typeof CREDIT_ADDED_SUCCESS, payload: Credit };
export type CreditAddedFailureActionType = { type: typeof CREDIT_ADDED_FAILURE, payload: CreditError };
export type FetchUserCreditsActionType = { type: typeof FETCH_USER_CREDITS_SUCCESS, payload: Array<Credit> };
export type CreditRequestAddedSuccessActionType = { type: typeof CREDIT_REQUEST_ADDED_SUCCESS, payload: CreditRequest };
export type FetchCreditRequestsSuccessActionType = { type: typeof FETCH_CREDIT_REQUESTS_SUCCESS, payload: Array<CreditRequest>};
export type CreditRequestDeletedSuccessActionType = { type: typeof CREDIT_REQUEST_DELETED_SUCCESS, payload: Array<CreditRequest> };

export type CreditActionTypes = FetchCreditSuccessActionType | CreditAddedSuccessActionType |
    CreditAddedFailureActionType | FetchUserCreditsActionType | ShowLoaderActionType |
    CreditRequestAddedSuccessActionType | FetchCreditRequestsSuccessActionType | CreditRequestDeletedSuccessActionType;
