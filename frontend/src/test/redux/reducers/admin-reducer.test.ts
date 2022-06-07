import {createStore} from "redux";
import rootReducer from "../../../redux/reducers/root-reducer";
import adminReducer, {InitialStateType} from "../../../redux/reducers/admin-reducer";
import {
    getAllUsers,
    getUserInfo,
    getUserAccounts,
    loadingData,
    reset,
} from "../../../redux/actions/admin-actions";
import {Transfer, User} from "../../../types/types";
import {userData, usersData} from "../../test-data/user-test-data";
import {transferData} from "../../test-data/order-test-data";

let store = createStore(rootReducer);
let user: User;
let users: Array<User>;
let transfers: Array<Transfer>;
let userTransfers: Array<Transfer>;

// todo: same thing with tests here. should work when you finish writing good test data for transfers array.

beforeEach(() => {
    user = userData;
    users = usersData;
    // transfers = transfersData;
    // userTransfers = transfersData;
});

test("Loading Data", () => {
    const state: InitialStateType = adminReducer(store.getState().admin, loadingData());
    expect(state.isLoaded).toBeTruthy();
});


test("Fetch User Info Success", () => {
    const state: InitialStateType = adminReducer(store.getState().admin, getUserInfo(user));
    expect(state.user).toEqual(user);
    expect(state.isLoaded).toBeFalsy();
});

test("Fetch All Users Success", () => {
    const state: InitialStateType = adminReducer(store.getState().admin, getAllUsers(users));
    expect(state.users).toEqual(users);
    expect(state.isLoaded).toBeFalsy();
});

// test("Form Reset", () => {
//     const state: InitialStateType = adminReducer(store.getState().admin, reset());
//     expect(state.isPerfumeAdded).toBeFalsy();
//     expect(state.isPerfumeEdited).toBeFalsy();
//     // expect(state.errors).toEqual({});
// });
