import {
    AuthErrors,
    User,
    UserEditErrors,
    Account,
    Transfer
} from "../../types/types";
import { LOGOUT_SUCCESS } from "../action-types/auth-action-types";
import {
    FETCH_USER_SUCCESS,
    FETCH_ACCOUNT_INFO_SUCCESS,
    FETCH_USER_ACCOUNTS_SUCCESS,
    USER_UPDATED_FAILURE,
    USER_UPDATED_PASSWORD_FAILURE,
    USER_UPDATED_PASSWORD_SUCCESS,
    USER_UPDATED_SUCCESS,
    RESET_INPUT_FORM,
    LOADING_USER_INFO,
    UserActionsTypes
} from "../action-types/user-actions-types";

export type InitialStateType = {
    user: Partial<User>
    accounts: Array<Account>
    account: Partial<Account>
    accountTransfers: Array<Transfer>
    isLoggedIn: boolean
    isLoaded: boolean
    successMessage: string
    userEditErrors: Partial<UserEditErrors>
    userResetPasswordErrors: Partial<AuthErrors>
    isReviewAdded: boolean
};

const initialState: InitialStateType = {
    user: {},
    accounts: [],
    account: {},
    accountTransfers: [],
    isLoggedIn: false,
    isLoaded: false,
    successMessage: "",
    userEditErrors: {},
    userResetPasswordErrors: {},
    isReviewAdded: false
};

const reducer = (state: InitialStateType = initialState, action: UserActionsTypes): InitialStateType => {

    switch (action.type) {
        case LOADING_USER_INFO:
            return { ...state, isLoaded: true }

        case FETCH_ACCOUNT_INFO_SUCCESS:
            return { ...state, account: action.payload, isLoggedIn: true, isLoaded: false }

        case FETCH_USER_ACCOUNTS_SUCCESS:
            return { ...state, accounts: action.payload, isLoggedIn: true, isLoaded: false }

        case FETCH_USER_SUCCESS:
            return { ...state, user: action.payload, isLoggedIn: true, isLoaded: false }

        case USER_UPDATED_SUCCESS:
            return { ...state, user: action.payload, userEditErrors: {} };

        case USER_UPDATED_FAILURE:
            return { ...state, userEditErrors: action.payload };

        case USER_UPDATED_PASSWORD_SUCCESS:
            return { ...state, successMessage: action.payload, userResetPasswordErrors: {} };

        case USER_UPDATED_PASSWORD_FAILURE:
            return { ...state, userResetPasswordErrors: action.payload };

        case LOGOUT_SUCCESS:
            return { ...state, user: {}, isLoggedIn: false }

        default:
            return state;
    }
};

export default reducer;
