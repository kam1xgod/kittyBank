import {Currency} from "../../types/types";
import {
  FETCH_CURRENCY_SUCCESS,
  CURRENCY_ADDED_SUCCESS,
  CURRENCY_ADDED_FAILURE,
  FetchCurrencySuccessActionType,
  CurrencyAddedSuccessActionType,
  CurrencyAddedFailureActionType,
} from "../action-types/currency-action-types";

export const fetchCurrencySuccess = (currencies: Array<Currency>): FetchCurrencySuccessActionType => ({
    type: FETCH_CURRENCY_SUCCESS,
    payload: currencies 
});

export const currencyAddedSuccess = (currency: Currency): CurrencyAddedSuccessActionType => ({
    type: CURRENCY_ADDED_SUCCESS,
    payload: currency
});

export const currencyAddedFailure = (error: string): CurrencyAddedFailureActionType => ({
    type: CURRENCY_ADDED_FAILURE,
    payload: error
});
