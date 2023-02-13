import {Credit, CreditError, CreditRequest} from "../../types/types";
import {
    FETCH_CREDIT_SUCCESS,
    FETCH_USER_CREDITS_SUCCESS,
    CREDIT_ADDED_FAILURE,
    CREDIT_ADDED_SUCCESS,
    CREDIT_REQUEST_ADDED_SUCCESS,
    FetchCreditSuccessActionType,
    FetchUserCreditsActionType,
    CreditRequestAddedSuccessActionType,
    CreditAddedFailureActionType,
    CreditAddedSuccessActionType,
    CreditRequestDeletedSuccessActionType,
    CREDIT_REQUEST_DELETED_SUCCESS
} from "../action-types/credit-action-types";

export const fetchCreditSuccess = (credit: Credit): FetchCreditSuccessActionType => ({
    type: FETCH_CREDIT_SUCCESS,
    payload: credit
});

export const creditAddedSuccess = (credit: Credit): CreditAddedSuccessActionType => ({
    type: CREDIT_ADDED_SUCCESS,
    payload: credit
});

export const creditAddedFailure = (error: string): CreditAddedFailureActionType => ({
    type: CREDIT_ADDED_FAILURE,
    payload: error
});

export const fetchUserCreditsSuccess = (credits: Array<Credit>): FetchUserCreditsActionType => ({
    type: FETCH_USER_CREDITS_SUCCESS,
    payload: credits
});

export const creditRequestAddedSuccess = (creditRequest: CreditRequest): CreditRequestAddedSuccessActionType => ({
    type: CREDIT_REQUEST_ADDED_SUCCESS,
    payload: creditRequest
});

export const creditRequestDeletedSuccess = (creditRequests: Array<CreditRequest>): CreditRequestDeletedSuccessActionType => ({
    type: CREDIT_REQUEST_DELETED_SUCCESS,
    payload: creditRequests
})
