import { Dispatch } from "redux";

import {
    getAllUsers,
    getUserInfo,
    getUserAccounts,
    getAccountTransfers,
    getAllAccounts,
    reset,
    loadingData,
    getAccountInfo,
    getAllTransfers,
    getAllCredits,
    getCreditInfo,
    getAllSavingPlans,
    getSavingPlanInfo,
    getAllCreditRequests,
} from "../actions/admin-actions";
import RequestService from '../../utils/request-service';

export const fetchUserAccounts = (id?: string) => async (dispatch: Dispatch) => {
    const response = await RequestService.get("/admin/users/byId/" + id + "/accounts", true);
    dispatch(getUserAccounts(response.data));
};

export const fetchUserAccountsByMail = (mail: string) => async (dispatch: Dispatch) => {
    const response = await RequestService.get("/admin/users/byMail/" + mail + "/accounts", true);
    dispatch(getUserAccounts(response.data));
}

export const fetchAllUsers = () => async (dispatch: Dispatch) => {
    try {
        dispatch(loadingData());
        const response = await RequestService.get("/admin/users", true);
        dispatch(getAllUsers(response.data));
    } catch (error) {
        console.log(error);
    };
};

export const fetchUserInfo = (id: string) => async (dispatch: Dispatch) => {
    dispatch(loadingData());
    const response = await RequestService.get("/admin/users/byId/" + id, true);
    dispatch(getUserInfo(response.data));
};

export const fetchUserInfoByMail = (mail: string) => async (dispatch: Dispatch) => {
    dispatch(loadingData());
    const response = await RequestService.get("/admin/users/byMail/" + mail, true);
    dispatch(getUserInfo(response.data));
};

export const fetchAllAccounts = () => async (dispatch: Dispatch) => {
    try {
        dispatch(loadingData());
        const response = await RequestService.get("/admin/accounts", true);
        dispatch(getAllAccounts(response.data));
    } catch (error) {
        console.log(error);
    };
};

export const fetchAccountInfo = (id: string) => async (dispatch: Dispatch) => {
    dispatch(loadingData());
    const response = await RequestService.get("/admin/accounts/" + id, true);
    dispatch(getAccountInfo(response.data));
};

export const fetchAccountTransfers = (id?: string) => async (dispatch: Dispatch) => {
    const response = await RequestService.get("/admin/accounts/" + id + "/transfers", true);
    dispatch(getAccountTransfers(response.data));
};

export const fetchAllTransfers = () => async (dispatch: Dispatch) => {
    try {
        dispatch(loadingData());
        const response = await RequestService.get("/admin/transfers", true);
        dispatch(getAllTransfers(response.data));
    } catch (error) {
        console.log(error);
    };
};

export const fetchAllCredits = () => async (dispatch:Dispatch) => {
    try {
        dispatch(loadingData());
        const response = await RequestService.get("/admin/credits", true);
        dispatch(getAllCredits(response.data));
    } catch (error) {
        console.log(error);
    }
}

export const fetchCreditInfo = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(loadingData());
        const response = await RequestService.get("/admin/credits/" + id, true);
        dispatch(getCreditInfo(response.data));
    } catch (error) {
        console.log(error);
    }
}

export const fetchCreditRequests = () => async (dispatch: Dispatch) => {
    try {
        dispatch(loadingData());
        const response = await RequestService.get("/admin/credits/requests", true);
        dispatch(getAllCreditRequests(response.data));
    } catch(error) {
        console.log(error);
    }
}

export const fetchAllSavingPlans = () => async (dispatch: Dispatch) => {
    try {
        dispatch(loadingData());
        const response = await RequestService.get("/admin/savings", true);
        dispatch(getAllSavingPlans(response.data));
    } catch (error) {
        console.log(error);
    }
}

export const fetchSavingPlanInfo = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(loadingData());
        const response = await RequestService.get("/admin/savings/" + id, true);
        dispatch(getSavingPlanInfo(response.data));
    } catch (error) {
        console.log(error);
    }
}

export const formReset = () => async (dispatch: Dispatch) => {
    dispatch(reset());
};