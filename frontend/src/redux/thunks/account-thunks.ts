import {Dispatch} from "redux";

import {
    fetchAccountSuccess,
    fetchUserAccountsSuccess,
    accountAddedFailure,
    accountAddedSuccess,
    activateAccountSuccess,
    activateAccountFailure
} from "../actions/account-actions";
import RequestService from '../../utils/request-service';
import { showLoader } from "../actions/auth-actions";

export const fetchUserAccounts = () => async (dispatch: Dispatch) => {
    const response = await RequestService.get("/user/accounts", true);
    dispatch(fetchUserAccountsSuccess(response.data));
};

export const fetchUserCardAccounts = () => async (dispatch: Dispatch) => {
    const response = await RequestService.get("/user/accounts/card", true);
    dispatch(fetchUserAccountsSuccess(response.data));
};

export const fetchUserCreditAccounts = () => async (dispatch: Dispatch) => {
  const response = await RequestService.get("/user/accounts/credit", true)
  dispatch(fetchUserAccountsSuccess(response.data));
}

export const addAccount = (data: FormData, history: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(showLoader());
        const response = await RequestService.post("/account/new", data, true, "multipart/form-data");
        history.push("/account/finalize");
        // localStorage.removeItem()
        dispatch(accountAddedSuccess(response.data));
    } catch (error) {
        // @ts-ignore
        dispatch(accountAddedFailure(error.response?.data));
    }
};

export const fetchAccountInfo = (id: string) => async (dispatch: Dispatch) => {
    dispatch(showLoader());
    const response = await RequestService.get("/user/accounts/" + id, true);
    dispatch(fetchAccountSuccess(response.data));
};

export const activateAccount = (code: string) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.get("/account/activate/" + code, true);
        dispatch(activateAccountSuccess(response.data));
    } catch (error) {
        // @ts-ignore
        dispatch(activateAccountFailure(error.response.data));
    }
};
