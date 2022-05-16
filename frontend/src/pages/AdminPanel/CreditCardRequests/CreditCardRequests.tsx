import React, { useEffect } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Spinner from "../../../component/Spinner/Spinner";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import { fetchCreditRequests } from "../../../redux/thunks/admin-thunks";
import { CreditRequest } from "../../../types/types";

const CreditCardRequests: FC = () => {
    const dispatch = useDispatch();
    const creditRequests: Array<CreditRequest> = useSelector((state: AppStateType) => state.admin.creditRequests);
    const loading: boolean = useSelector((state: AppStateType) => state.user.isLoaded);

    useEffect(() => {
        dispatch(fetchCreditRequests());
    }, [dispatch])

    return (
        <div className="container">
            {loading ? <Spinner /> : <>
                <table className="table mt-4 border text-center">
                    <thead className="table-active">
                        <tr>
                            <th>Requests №</th>
                            <th>Email</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {creditRequests.map((request) => {
                            return (
                                <tr key={request.id}>
                                    <th>{request.id}</th>
                                    <th>
                                        <NavLink to={{
                                            pathname: `/admin/users/${request.mail}`
                                        }}
                                        className="admin-sidebar-link nav-link my-2 px-2 py-2"
                                        activeClassName="is-active">{request.mail}</NavLink>
                                    </th>
                                    <th>
                                        <NavLink to={{
                                            pathname: `/admin/requests/${request.mail}/decline`,
                                            state: request
                                        }}
                                            className="admin-sidebar-link nav-link border my-2 px-2 py-2"
                                            activeClassName="is-active"
                                            style={{ backgroundColor: "aquamarine", textAlign: "center" }}>Decline</NavLink>
                                    </th>
                                    <th>
                                        <NavLink to={{
                                            pathname: `/admin/requests/${request.mail}/approve`,
                                            state: request
                                        }}
                                            className="admin-sidebar-link nav-link border my-2 px-2 py-2"
                                            activeClassName="is-active"
                                            style={{ backgroundColor: "aquamarine", textAlign: "center" }}>Approve</NavLink>
                                    </th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>}
        </div>
    )
}

export default CreditCardRequests;