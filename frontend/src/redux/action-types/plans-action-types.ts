import { SavingPlan, SavingPlanError } from "../../types/types";
import { ShowLoaderActionType } from "./auth-action-types";

export const FETCH_SAVING_PLAN_SUCCESS = "FETCH_SAVING_PLAN_SUCCESS";
export const FETCH_SAVING_PLANS_SUCCESS = "FETCH_SAVING_PLANS_SUCCESS";
export const SAVING_PLAN_ADDED_SUCCESS = "SAVING_PLAN_ADDED_SUCCESS";
export const SAVING_PLAN_ADDED_FAILURE = "SAVING_PLAN_ADDED_FAILURE";
export const SAVING_PLAN_EDITED_SUCCESS = "SAVING_PLAN_EDITED_SUCCESS";
export const SAVING_PLAN_EDITED_FAILURE = "SAVING_PLAN_EDITED_FAILURE";

export type FetchSavingPlanSuccessActionType = { type: typeof FETCH_SAVING_PLAN_SUCCESS, payload: SavingPlan };
export type FetchSavingPlansSuccessActionType = { type: typeof FETCH_SAVING_PLANS_SUCCESS, payload: Array<SavingPlan> };
export type SavingPlanAddedSuccessActionType = { type: typeof SAVING_PLAN_ADDED_SUCCESS, payload: SavingPlan };
export type SavingPlanAddedFailureActionType = { type: typeof SAVING_PLAN_ADDED_FAILURE, payload: SavingPlanError };
export type SavingPlanEditedSuccessActionType = { type: typeof SAVING_PLAN_EDITED_SUCCESS, payload: SavingPlan };
export type SavingPlanEditedFailureActionType = { type: typeof SAVING_PLAN_EDITED_FAILURE, payload: SavingPlanError };

export type SavingPlanActionTypes = FetchSavingPlanSuccessActionType | SavingPlanAddedSuccessActionType |
    SavingPlanAddedFailureActionType | SavingPlanEditedFailureActionType | SavingPlanEditedSuccessActionType |
    ShowLoaderActionType | FetchSavingPlansSuccessActionType;
