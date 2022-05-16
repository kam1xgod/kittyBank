import {SavingPlan, SavingPlanError} from "../../types/types";
import {
    FETCH_SAVING_PLAN_SUCCESS,
    SAVING_PLAN_ADDED_FAILURE,
    SAVING_PLAN_ADDED_SUCCESS,
    SAVING_PLAN_EDITED_FAILURE,
    SAVING_PLAN_EDITED_SUCCESS,
    FetchSavingPlanSuccessActionType,
    SavingPlanAddedFailureActionType,
    SavingPlanAddedSuccessActionType,
    SavingPlanEditedFailureActionType,
    SavingPlanEditedSuccessActionType,
    FETCH_SAVING_PLANS_SUCCESS,
    FetchSavingPlansSuccessActionType
} from "../action-types/plans-action-types";

export const fetchSavingPlanSuccess = (savingPlan: SavingPlan): FetchSavingPlanSuccessActionType => ({
    type: FETCH_SAVING_PLAN_SUCCESS,
    payload: savingPlan
});

export const fetchSavingPlansSuccess = (savingPlans: Array<SavingPlan>): FetchSavingPlansSuccessActionType => ({
    type: FETCH_SAVING_PLANS_SUCCESS,
    payload: savingPlans
});

export const savingPlanAddedSuccess = (savingPlan: SavingPlan): SavingPlanAddedSuccessActionType => ({
    type: SAVING_PLAN_ADDED_SUCCESS,
    payload: savingPlan
});

export const savingPlanAddedFailure = (error: SavingPlanError): SavingPlanAddedFailureActionType => ({
    type: SAVING_PLAN_ADDED_FAILURE,
    payload: error
});

export const savingPlanEditedSuccess = (savingPlan: SavingPlan): SavingPlanEditedSuccessActionType => ({
    type: SAVING_PLAN_EDITED_SUCCESS,
    payload: savingPlan
});

export const savingPlanEditedFailure = (error: SavingPlanError): SavingPlanEditedFailureActionType => ({
    type: SAVING_PLAN_EDITED_FAILURE,
    payload: error
});