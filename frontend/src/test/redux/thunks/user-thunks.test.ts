import {AnyAction} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {InitialStateType} from "../../../redux/reducers/user-reducer";
import {API_BASE_URL} from "../../../utils/constants/url";
import {
    authErrorsData,
    userData,
    userEditErrorsData,
    userResetPasswordData
} from "../../test-data/user-test-data";
import {
    // addReviewToPerfume,
    fetchUserInfo,
    // fetchUserInfoByQuery,
    updateUserInfo,
    updateUserPassword} from "../../../redux/thunks/user-thunks";
import {
    fetchUserSuccess,
    loadingUserInfo,
    userUpdatedFailure,
    userUpdatedPasswordFailure,
    userUpdatedPasswordSuccess,
    userUpdatedSuccess
} from "../../../redux/actions/user-actions";

const middlewares = [thunk];
const mockStore = configureMockStore<InitialStateType, ThunkDispatch<InitialStateType, void, AnyAction>>(middlewares);
const mock = new MockAdapter(axios.create());
const store = mockStore();

describe("user actions", () => {

    beforeEach(() => {
        store.clearActions();
    });

    test("fetchUserInfo should dispatches LOADING_USER_INFO and FETCH_USER_SUCCESS on success", async () => {
        mock.onGet(API_BASE_URL + "/users/info").reply(200, userData);
        await store.dispatch(fetchUserInfo());
        let expectedActions = [loadingUserInfo(), fetchUserSuccess(userData)];
        expect(store.getActions()).toEqual(expectedActions);
        expect(localStorage.getItem("mail")).toEqual("test123@test.com");
        expect(localStorage.getItem("role")).toEqual("USER");
        expect(localStorage.getItem("isLoggedIn")).toEqual("true");
    });

    test("updateUserInfo should dispatches USER_UPDATED_SUCCESS on success", async () => {
        mock.onPut(API_BASE_URL + "/users/edit").reply(200, userData);
        await store.dispatch(updateUserInfo(userData));
        let expectedActions = [userUpdatedSuccess(userData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("updateUserInfo should dispatches USER_UPDATED_FAILURE on failure", async () => {
        mock.onPut(API_BASE_URL + "/users/edit").reply(400, userEditErrorsData);
        await store.dispatch(updateUserInfo(userData));
        let expectedActions = [userUpdatedFailure(userEditErrorsData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("updateUserPassword should dispatches USER_UPDATED_PASSWORD_SUCCESS on success", async () => {
        mock.onPut(API_BASE_URL + "/users/edit/password").reply(200, "Success");
        await store.dispatch(updateUserPassword(userResetPasswordData));
        let expectedActions = [userUpdatedPasswordSuccess("Success")];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("updateUserPassword should dispatches USER_UPDATED_PASSWORD_FAILURE on failure", async () => {
        mock.onPut(API_BASE_URL + "/users/edit/password").reply(400, authErrorsData);
        await store.dispatch(updateUserPassword(userResetPasswordData));
        let expectedActions = [userUpdatedPasswordFailure(authErrorsData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    // test("fetchUserInfoByQuery should dispatches LOADING_USER_INFO and FETCH_USER_SUCCESS on success", async () => {
    //     mock.onPost(API_BASE_URL + "/users/graphql/info").reply(200, {data: {user: userData}});
    //     await store.dispatch(fetchUserInfoByQuery("1"));
    //     let expectedActions = [loadingUserInfo(), fetchUserSuccess(userData)];
    //     expect(store.getActions()).toEqual(expectedActions);
    //     expect(localStorage.getItem("mail")).toEqual("test123@test.com");
    //     expect(localStorage.getItem("role")).toEqual("USER");
    //     expect(localStorage.getItem("isLoggedIn")).toEqual("true");
    // });
});
