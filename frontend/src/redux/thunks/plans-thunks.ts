import {Dispatch} from "redux";

import {
    fetchSavingPlansSuccess,
    savingPlanAddedFailure,
    savingPlanAddedSuccess,
    savingPlanEditedFailure,
    savingPlanEditedSuccess
} from "../actions/plans-action";
import RequestService from '../../utils/request-service';
import { showLoader } from "../actions/auth-actions";

export const fetchSavingPlans = () => async (dispatch: Dispatch) => {
    const response = await RequestService.get("/savings/all");
    dispatch(fetchSavingPlansSuccess(response.data));
};

export const addSavingPlan = (data: FormData, history: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(showLoader());
        const response = await RequestService.post("/admin/savings/add", data, true, "multipart/form-data");
        history.push("/account/finalize");
        // localStorage.removeItem()
        dispatch(savingPlanAddedSuccess(response.data));
    } catch (error) {
        // @ts-ignore
        dispatch(savingPlanAddedFailure(error.response?.data));
    }
};

export const editSavingPlan = (id: string, data: FormData, history: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(showLoader());
        const response = await RequestService.post("/admin/savings/update/" + id, data, true, "multipart/form-data");
        history.push("/account/finalize");
        dispatch(savingPlanEditedSuccess(response.data));
    } catch (error) {
        // @ts-ignore
        dispatch(savingPlanEditedFailure(error.response?.data));
    }
}