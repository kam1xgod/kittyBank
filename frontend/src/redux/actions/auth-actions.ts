import {AuthErrors, User} from "../../types/types";
import {
    ACTIVATE_USER_FAILURE,
    ACTIVATE_USER_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    RESET_PASSWORD_CODE_FAILURE,
    RESET_PASSWORD_CODE_SUCCESS,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_SUCCESS,
    SHOW_LOADER,
    ActivateUserFailureActionType,
    ActivateUserSuccessActionType,
    ForgotPasswordFailureActionType,
    ForgotPasswordSuccessActionType,
    LoginFailureActionType,
    LoginSuccessActionType,
    LogoutSuccessActionType,
    RegisterFailureActionType,
    RegisterSuccessActionType,
    ResetPasswordCodeFailureActionType,
    ResetPasswordCodeSuccessActionType,
    ResetPasswordFailureActionType,
    ResetPasswordSuccessActionType,
    ShowLoaderActionType
} from "../action-types/auth-action-types";

export const loginSuccess = (role: string): LoginSuccessActionType => ({
    type: LOGIN_SUCCESS,
    payload: role
});

export const loginFailure = (error: string): LoginFailureActionType => ({
    type: LOGIN_FAILURE,
    payload: error
});

export const showLoader = (): ShowLoaderActionType => ({
    type: SHOW_LOADER
});

export const registerSuccess = (): RegisterSuccessActionType => ({
    type: REGISTER_SUCCESS
});

export const registerFailure = (errors: AuthErrors): RegisterFailureActionType => ({
    type: REGISTER_FAILURE,
    payload: errors
});

export const logoutSuccess = (): LogoutSuccessActionType => ({
    type: LOGOUT_SUCCESS
});

export const activateUserSuccess = (message: string): ActivateUserSuccessActionType => ({
    type: ACTIVATE_USER_SUCCESS,
    payload: message
});

export const activateUserFailure = (error: string): ActivateUserFailureActionType => ({
    type: ACTIVATE_USER_FAILURE,
    payload: error
});

export const forgotPasswordSuccess = (message: string): ForgotPasswordSuccessActionType => ({
    type: FORGOT_PASSWORD_SUCCESS,
    payload: message
});

export const forgotPasswordFailure = (error: string): ForgotPasswordFailureActionType => ({
    type: FORGOT_PASSWORD_FAILURE,
    payload: error
});

export const resetPasswordCodeSuccess = (user: User): ResetPasswordCodeSuccessActionType => ({
    type: RESET_PASSWORD_CODE_SUCCESS,
    payload: user
});

export const resetPasswordCodeFailure = (error: string): ResetPasswordCodeFailureActionType => ({
    type: RESET_PASSWORD_CODE_FAILURE,
    payload: error
});

export const resetPasswordSuccess = (message: string): ResetPasswordSuccessActionType => ({
    type: RESET_PASSWORD_SUCCESS,
    payload: message
});

export const resetPasswordFailure = (errors: AuthErrors): ResetPasswordFailureActionType => ({
    type: RESET_PASSWORD_FAILURE,
    payload: errors
});

