import {Dispatch} from "redux";

import {
    fetchCurrencySuccess,
    currencyAddedFailure,
    currencyAddedSuccess,
} from "../actions/currency-actions";
import RequestService from '../../utils/request-service';
import { showLoader } from "../actions/auth-actions";

export const addCurrency = (data: FormData, history: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(showLoader());
        const response = await RequestService.post("/currency/add", data, true, "multipart/form-data");
        dispatch(currencyAddedSuccess(response.data));
    } catch (error) {
        // @ts-ignore
        dispatch(currencyAddedFailure(error.response?.data));
    }
};

export const fetchCurrencyInfo = () => async (dispatch: Dispatch) => {
    dispatch(showLoader());
    const response = await RequestService.get("/currency", true);
    dispatch(fetchCurrencySuccess(response.data));
};
