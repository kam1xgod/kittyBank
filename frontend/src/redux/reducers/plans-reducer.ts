import { SavingPlan, SavingPlanError } from "../../types/types";
import {
    SavingPlanActionTypes,
    FETCH_SAVING_PLAN_SUCCESS,
    SAVING_PLAN_ADDED_FAILURE,
    SAVING_PLAN_ADDED_SUCCESS,
    SAVING_PLAN_EDITED_FAILURE,
    SAVING_PLAN_EDITED_SUCCESS,
    FETCH_SAVING_PLANS_SUCCESS
} from "../action-types/plans-action-types";

import { SHOW_LOADER } from "../action-types/auth-action-types";

export type InitialStateType = {
    savingPlan: Partial<SavingPlan>,
    savingPlans: Array<SavingPlan>,
    error: Partial<SavingPlanError>,
    errors: string,
    loading: boolean
};

const initialState: InitialStateType = {
    savingPlan: {},
    savingPlans: [],
    error: {},
    errors: "",
    loading: false
};

const reducer = (state: InitialStateType = initialState, action: SavingPlanActionTypes): InitialStateType => {

    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, loading: true }

        case FETCH_SAVING_PLAN_SUCCESS:
            return { ...state, savingPlan: action.payload, loading: false };

        case FETCH_SAVING_PLANS_SUCCESS:
            return { ...state, savingPlans: action.payload, loading: false };

        case SAVING_PLAN_ADDED_FAILURE:
            return { ...state, error: action.payload, loading: false };

        case SAVING_PLAN_ADDED_SUCCESS:
            return { ...state, savingPlan: action.payload, loading: false };

        case SAVING_PLAN_EDITED_FAILURE:
            return { ...state, error: action.payload, loading: false };

        case SAVING_PLAN_EDITED_SUCCESS:
            return { ...state, savingPlan: action.payload, loading: false };

        default:
            return state;
    }
};

export default reducer;
