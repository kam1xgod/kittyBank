import {AuthErrors, User, UserEditErrors, Account} from "../../types/types";
import {
    LOADING_USER_INFO,
    FETCH_USER_SUCCESS,
    FETCH_ACCOUNT_INFO_SUCCESS,
    FETCH_USER_ACCOUNTS_SUCCESS,
    RESET_INPUT_FORM,
    USER_UPDATED_FAILURE,
    USER_UPDATED_PASSWORD_FAILURE,
    USER_UPDATED_PASSWORD_SUCCESS,
    USER_UPDATED_SUCCESS,
    UserUpdatedFailureActionType,
    UserUpdatedPasswordFailureActionType,
    UserUpdatedPasswordSuccessActionType,
    UserUpdatedSuccessActionType,
    ResetInputFormActionType,
    FetchUserSuccessActionType,
    GetAccountInfoActionType,
    GetUserAccountsActionType,
    LoadingUserInfoActionType
} from "../action-types/user-actions-types";

export const loadingUserInfo = (): LoadingUserInfoActionType => ({
    type: LOADING_USER_INFO
});

export const fetchUserSuccess = (user: User): FetchUserSuccessActionType => ({
    type: FETCH_USER_SUCCESS,
    payload: user
});

export const userUpdatedSuccess = (user: User): UserUpdatedSuccessActionType => ({
    type: USER_UPDATED_SUCCESS,
    payload: user
});

export const userUpdatedFailure = (errors: UserEditErrors): UserUpdatedFailureActionType => ({
    type: USER_UPDATED_FAILURE,
    payload: errors
});

export const userUpdatedPasswordSuccess = (message: string): UserUpdatedPasswordSuccessActionType => ({
    type: USER_UPDATED_PASSWORD_SUCCESS,
    payload: message
});

export const userUpdatedPasswordFailure = (errors: AuthErrors): UserUpdatedPasswordFailureActionType => ({
    type: USER_UPDATED_PASSWORD_FAILURE,
    payload: errors
});

export const resetInputForm = (): ResetInputFormActionType => ({
    type: RESET_INPUT_FORM,
});