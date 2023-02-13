import { Currency } from "../../types/types";
import { ShowLoaderActionType } from "./auth-action-types";

export const FETCH_CURRENCY_SUCCESS = "FETCH_CURRENCY_SUCCESS";
export const CURRENCY_ADDED_SUCCESS = "CURRENCY_ADDED_SUCCESS";
export const CURRENCY_ADDED_FAILURE = "CURRENCY_ADDED_FAILURE";

export type FetchCurrencySuccessActionType = { type: typeof FETCH_CURRENCY_SUCCESS, payload: Array<Currency> };
export type CurrencyAddedSuccessActionType = { type: typeof CURRENCY_ADDED_SUCCESS, payload: Currency };
export type CurrencyAddedFailureActionType = { type: typeof CURRENCY_ADDED_FAILURE, payload: string };

export type CurrencyActionTypes = FetchCurrencySuccessActionType | CurrencyAddedSuccessActionType |
    CurrencyAddedFailureActionType | ShowLoaderActionType; 
