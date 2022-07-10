import {Dispatch} from "redux";

import {
    fetchCreditSuccess,
    fetchUserCreditsSuccess,
    creditAddedFailure,
    creditAddedSuccess,
    creditRequestAddedSuccess,
    creditRequestDeletedSuccess
} from "../actions/credit-actions";
import RequestService from '../../utils/request-service';
import { showLoader } from "../actions/auth-actions";

export const fetchUserCredits = () => async (dispatch: Dispatch) => {
    const response = await RequestService.get("/user/credits", true);
    dispatch(fetchUserCreditsSuccess(response.data));
};

export const addCredit = (data: FormData, history: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(showLoader());
        const response = await RequestService.post("/credit/new", data, true, "multipart/form-data");
        history.push("/account/finalize");
        dispatch(creditAddedSuccess(response.data));
    } catch (error) {
        // @ts-ignore
        dispatch(creditAddedFailure(error.response?.data));
    }
};

export const fetchCreditInfo = (id: string) => async (dispatch: Dispatch) => {
    dispatch(showLoader());
    const response = await RequestService.get("/user/credits/" + id, true);
    dispatch(fetchCreditSuccess(response.data));
};

export const addCreditRequest = (mail: string) =>async (dispatch:Dispatch) => {
    dispatch(showLoader());
    const response = await RequestService.get("/credit/request/" + mail, true);
    dispatch(creditRequestAddedSuccess(response.data));
}

export const deleteCreditRequest = (mail: string, history: any) => async (dispatch: Dispatch) => {
    dispatch(showLoader());
    const response = await RequestService.get("/admin/credits/requests/delete/" + mail, true);
    dispatch(creditRequestDeletedSuccess(response.data));
    history.push("/admin/requests");
}
