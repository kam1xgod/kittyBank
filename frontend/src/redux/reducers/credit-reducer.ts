import { Credit, CreditError, CreditRequest } from "../../types/types";
import {
    FETCH_CREDIT_SUCCESS,
    FETCH_USER_CREDITS_SUCCESS,
    CREDIT_ADDED_FAILURE,
    CREDIT_ADDED_SUCCESS,
    CreditActionTypes,
    CREDIT_REQUEST_ADDED_SUCCESS,
    FETCH_CREDIT_REQUESTS_SUCCESS,
    CREDIT_REQUEST_DELETED_SUCCESS,
} from "../action-types/credit-action-types";

import { SHOW_LOADER } from "../action-types/auth-action-types";

export type InitialStateType = {
    credits: Array<Credit>,
    credit: Partial<Credit>,
    creditRequest: Partial<CreditRequest>
    creditRequests: Array<CreditRequest>
    error: Partial<CreditError>,
    errors: string,
    success: string,
    loading: boolean
};

const initialState: InitialStateType = {
    credits: [],
    credit: {},
    creditRequest: {},
    creditRequests: [],
    error: {},
    errors: "",
    success: "",
    loading: false
};

const reducer = (state: InitialStateType = initialState, action: CreditActionTypes): InitialStateType => {

    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, loading: true }

        case FETCH_CREDIT_SUCCESS:
            return { ...state, credit: action.payload, loading: false };

        case CREDIT_ADDED_FAILURE:
            return { ...state, error: action.payload, loading: false };

        case CREDIT_ADDED_SUCCESS:
            return { ...state, credit: action.payload, loading: false };

        case FETCH_USER_CREDITS_SUCCESS:
            return { ...state, credits: action.payload, loading: false };

        case CREDIT_REQUEST_ADDED_SUCCESS:
            return { ...state, creditRequest: action.payload, loading: false };

        case FETCH_CREDIT_REQUESTS_SUCCESS:
            return {...state, creditRequests: action.payload, loading: false};

        case CREDIT_REQUEST_DELETED_SUCCESS:
            return {...state, creditRequests: action.payload, loading: false};

        default:
            return state;
    }
};

export default reducer;
