import {
    FETCH_USER_INFO_SUCCESS,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_ACCOUNTS_SUCCESS,
    FETCH_USER_ACCOUNTS_SUCCESS,
    FORM_RESET,
    LOADING_DATA,
    FETCH_ALL_ACCOUNTS_SUCCESS,
    FETCH_ALL_TRANSFERS_SUCCESS,
    FETCH_ALL_CREDITS_SUCCESS,
    FETCH_CREDIT_INFO_SUCCESS,
    FETCH_ALL_SAVING_PLANS_SUCCESS,
    FETCH_SAVING_PLAN_INFO_SUCCESS,
    FETCH_ALL_CREDIT_REQUESTS_SUCCESS,
} from "../action-types/admin-action-types";
import { Account, User, Transfer, Credit, SavingPlan, CreditRequest } from "../../types/types";
import { AdminActionTypes } from "../action-types/admin-action-types";

export type InitialStateType = {
    accounts: Array<Account>
    account: Partial<Account>
    accountTransfers: Array<Transfer>
    userAccounts: Array<Account>
    users: Array<User>
    user: Partial<User>
    transfer: Partial<Transfer>
    transfers: Array<Transfer>
    credit: Partial<Credit>
    credits: Array<Credit>
    creditRequests: Array<CreditRequest>
    savingPlan: Partial<SavingPlan>
    savingPlans: Array<SavingPlan>
    isSavingPlanAdded: boolean
    isSavingPlanEdited: boolean
    isLoaded: boolean
};

const initialState: InitialStateType = {
    accounts: [],
    account: {},
    accountTransfers: [],
    userAccounts: [],
    users: [],
    user: {},
    transfer: {},
    transfers: [],
    credit: {},
    credits: [],
    creditRequests: [],
    savingPlan: {},
    savingPlans: [],
    isSavingPlanAdded: false,
    isSavingPlanEdited: false,
    isLoaded: false
};

const reducer = (state: InitialStateType = initialState, action: AdminActionTypes): InitialStateType => {

    switch (action.type) {
        case LOADING_DATA:
            return { ...state, isLoaded: true };

        case FETCH_USER_INFO_SUCCESS:
            return { ...state, user: action.payload, isLoaded: false };

        case FETCH_ALL_USERS_SUCCESS:
            return { ...state, users: action.payload, isLoaded: false };

        case FETCH_ALL_USERS_ACCOUNTS_SUCCESS:
            return { ...state, accounts: action.payload, isLoaded: false };

        case FETCH_USER_ACCOUNTS_SUCCESS:
            return { ...state, userAccounts: action.payload };

        case FETCH_ALL_ACCOUNTS_SUCCESS:
            return { ...state, accounts: action.payload, isLoaded: false };

        case FETCH_ALL_TRANSFERS_SUCCESS:
            return { ...state, transfers: action.payload, isLoaded: false };

        case FETCH_ALL_CREDITS_SUCCESS:
            return { ...state, credits: action.payload, isLoaded: false };

        case FETCH_CREDIT_INFO_SUCCESS:
            return { ...state, credit: action.payload, isLoaded: false };

        case FETCH_ALL_CREDIT_REQUESTS_SUCCESS:
            return {...state, creditRequests: action.payload, isLoaded: false};

        case FETCH_ALL_SAVING_PLANS_SUCCESS:
            return { ...state, savingPlans: action.payload, isLoaded: false };

        case FETCH_SAVING_PLAN_INFO_SUCCESS:
            return { ...state, savingPlan: action.payload, isLoaded: false };
        // case FORM_RESET:
        //     return { ...state, isPerfumeAdded: false, isPerfumeEdited: false, errors: {} };

        default:
            return state;
    }
};

export default reducer;
