import {Dispatch} from "redux";

import {
    fetchUserSuccess,
    loadingUserInfo,
    resetInputForm,
    userUpdatedFailure,
    userUpdatedPasswordFailure,
    userUpdatedPasswordSuccess,
    userUpdatedSuccess
} from "../actions/user-actions";
import {UserEdit, UserResetPasswordData} from "../../types/types";
import RequestService from '../../utils/request-service';

export const fetchUserInfo = () => async (dispatch: Dispatch) => {
    dispatch(loadingUserInfo());
    const response = await RequestService.get("/user/info", true);
    localStorage.setItem("mail", response.data.mail);
    localStorage.setItem("role", response.data.role);
    localStorage.setItem("isLoggedIn", "true");
    dispatch(fetchUserSuccess(response.data));
};

export const updateUserInfo = (userEdit: UserEdit) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.put("/user/edit", userEdit, true);
        dispatch(userUpdatedSuccess(response.data));
    } catch (error) {
        // @ts-ignore
        dispatch(userUpdatedFailure(error.response.data));
    }
};

export const updateUserPassword = (data: UserResetPasswordData) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.put("/auth/edit/password", data, true);
        dispatch(userUpdatedPasswordSuccess(response.data));
    } catch (error) {
        // @ts-ignore
        dispatch(userUpdatedPasswordFailure(error.response.data));
    }
};

export const resetForm = () => (dispatch: Dispatch) => {
    dispatch(resetInputForm());
};