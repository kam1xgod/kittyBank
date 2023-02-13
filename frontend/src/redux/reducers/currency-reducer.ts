import { Currency } from "../../types/types";
import {
    FETCH_CURRENCY_SUCCESS,
    CURRENCY_ADDED_FAILURE,
    CURRENCY_ADDED_SUCCESS,
    CurrencyActionTypes,
} from "../action-types/currency-action-types";

import { SHOW_LOADER } from "../action-types/auth-action-types";

export type InitialStateType = {
    currencies: Array<Currency>,
    currency: Partial<Currency>,
    errors: string, 
    error: string,
    success: string,
    loading: boolean
};

const initialState: InitialStateType = {
    currencies: [],
    currency: {},
    errors: "",
    error: "",
    success: "",
    loading: false
};

const reducer = (state: InitialStateType = initialState, action: CurrencyActionTypes): InitialStateType => {

    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, loading: true }

        case FETCH_CURRENCY_SUCCESS:
            return { ...state, currencies: action.payload, loading: false };

        case CURRENCY_ADDED_FAILURE:
            return { ...state, errors: action.payload, loading: false };

        case CURRENCY_ADDED_SUCCESS:
            return { ...state, currency: action.payload, loading: false };

        default:
            return state;
    }
};

export default reducer;
