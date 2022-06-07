import {
    activateUserFailure,
    activateUserSuccess,
    forgotPasswordFailure,
    forgotPasswordSuccess,
    loginFailure,
    loginSuccess,
    logoutSuccess,
    registerFailure,
    registerSuccess,
    resetPasswordCodeFailure,
    resetPasswordCodeSuccess,
    resetPasswordFailure,
    resetPasswordSuccess,
    showLoader
} from "../actions/auth-actions";
import {reset} from "../actions/admin-actions";
import {UserData, UserRegistration, UserResetPasswordData} from "../../types/types";
import {Dispatch} from "redux";
import RequestService from '../../utils/request-service';

export const login = (userData: UserData, history: any) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.post("/auth/login", userData);
        localStorage.setItem("mail", response.data.mail);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("isLoggedIn", "true");
        dispatch(loginSuccess(response.data.role));
        history.push("/user");
    } catch (error) {
        // @ts-ignore
        dispatch(loginFailure(error.response.data));
    }
};

export const registration = (userRegistrationData: UserRegistration) => async (dispatch: Dispatch) => {
    try {
        dispatch(showLoader());
        await RequestService.post("/registration", userRegistrationData);
        dispatch(registerSuccess());
    } catch (error) {
        // @ts-ignore
        dispatch(registerFailure(error.response.data));
    }
};

export const logout = () => async (dispatch: Dispatch) => {
    localStorage.removeItem("mail");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
    dispatch(logoutSuccess());
};

export const activateUser = (code: string) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.get("/registration/activation/" + code);
        dispatch(activateUserSuccess(response.data));
    } catch (error) {
        // @ts-ignore
        dispatch(activateUserFailure(error.response.data));
    }
};

export const forgotPassword = (mail: { mail: string }) => async (dispatch: Dispatch) => {
    try {
        dispatch(showLoader());
        const response = await RequestService.post("/auth/forgot", mail);
        dispatch(forgotPasswordSuccess(response.data));
    } catch (error) {
        // @ts-ignore
        dispatch(forgotPasswordFailure(error.response.data));
    }
};

export const fetchResetPasswordCode = (code: string) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.get("/auth/reset/" + code);
        dispatch(resetPasswordCodeSuccess(response.data));
    } catch (error) {
        // @ts-ignore
        dispatch(resetPasswordCodeFailure(error.response.data));
    }
};

export const resetPassword = (data: UserResetPasswordData, history: any) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.post("/auth/reset", data);
        dispatch(resetPasswordSuccess(response.data));
        history.push("/login");
    } catch (error) {
        // @ts-ignore
        dispatch(resetPasswordFailure(error.response.data));
    }
};

export const formReset = () => async (dispatch: Dispatch) => {
    dispatch(reset());
};
