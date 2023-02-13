import {combineReducers} from "redux";

import accountReducer from "./account-reducer";
import authReducer from "./auth-reducer";
import adminReducer from "./admin-reducer";
import userReducer from "./user-reducer";
import transferReducer from "./transfer-reducer";
import planReducer from "./plans-reducer"
import creditReducer from "./credit-reducer";
import currencyReducer from './currency-reducer'

const rootReducer = combineReducers({
    account: accountReducer,
    transfer: transferReducer,
    credit: creditReducer,
    currency: currencyReducer,
    savingPlan: planReducer,
    auth: authReducer,
    admin: adminReducer,
    user: userReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export default rootReducer;
