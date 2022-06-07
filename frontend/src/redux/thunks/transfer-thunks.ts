import { Dispatch } from "redux";

import {
    fetchTransferSuccess,
    fetchAccountTransfersSuccess,
    transferAddedFailure,
    transferAddedSuccess,
    fetchUserTransfersSuccess
} from "../actions/transfer-actions";
import RequestService from '../../utils/request-service';
import { showLoader } from "../actions/auth-actions";

export const fetchAccountTransfers = (id: string) => async (dispatch: Dispatch) => {
    const response = await RequestService.get("/user/accounts/" + id + "/transfers", true);
    dispatch(fetchAccountTransfersSuccess(response.data));
};

export const fetchUserTransfers = () => async (dispatch: Dispatch) => {
    const response = await RequestService.get("/user/transfers", true);
    dispatch(fetchUserTransfersSuccess(response.data));
}

export const addTransfer = (data: FormData, history: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(showLoader());
        const response = await RequestService.post("/transfer/new", data, true, "multipart/form-data");
        history.push("/transfer/finalize");
        // localStorage.removeItem()
        dispatch(transferAddedSuccess(response.data));
    } catch (error) {
        dispatch(transferAddedFailure(error.response.data));
    }
};

export const fetchTransfer = (id: string) => async (dispatch: Dispatch) => {
    dispatch(showLoader());
    const response = await RequestService.get("/user/transfers/" + id, true);
    dispatch(fetchTransferSuccess(response.data));
}