import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {faUserEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {fetchUserInfo, fetchUserAccounts, fetchUserInfoByMail, fetchUserAccountsByMail} from "../../../redux/thunks/admin-thunks";
import {Link, RouteComponentProps} from "react-router-dom";
import {AppStateType} from "../../../redux/reducers/root-reducer";
import {Account, User} from "../../../types/types";
import Spinner from '../../../component/Spinner/Spinner';

const ManageUser: FC<RouteComponentProps<{ id: string }>> = ({match}) => {
    const dispatch = useDispatch();
    const userData: Partial<User> = useSelector((state: AppStateType) => state.admin.user);
    const userAccounts: Array<Account> = useSelector((state: AppStateType) => state.user.accounts);
    const loading: boolean = useSelector((state: AppStateType) => state.admin.isLoaded);
    const {id, mail, firstname, lastname, role} = userData;

    useEffect(() => {
        dispatch(fetchUserInfoByMail(match.params.id));
    }, []);

    useEffect(() => {
        dispatch(fetchUserAccountsByMail(match.params.id));
    }, []);

    useEffect(() => {
        dispatch(fetchUserInfo(match.params.id));
    }, []);

    useEffect(() => {
        dispatch(fetchUserAccounts(match.params.id));
    }, [dispatch]);

    return (
        <>
            <div className="container">
                {loading ? <Spinner/> :
                    <>
                        <h4><FontAwesomeIcon className="mr-2" icon={faUserEdit}/> User: {firstname} {lastname}</h4>
                        <div className="row mt-5 mb-4 border px-3 py-3">
                            <div className="col-md-4">
                                <p className="personal_data_item">User id:
                                    <span className="personal_data_text">{id}</span>
                                </p>
                                <p className="personal_data_item">Email:
                                    <span className="personal_data_text">{mail}</span>
                                </p>
                                <p className="personal_data_item">Role:
                                    <span className="personal_data_text">{role}</span>
                                </p>
                            </div>
                            <div className="col-md-4">
                                <p className="personal_data_item">First name:
                                    <span className="personal_data_text">{firstname}</span>
                                </p>
                                <p className="personal_data_item">Last name:
                                    <span className="personal_data_text">{lastname}</span>
                                </p>
                            </div>
                        </div>
                        {userAccounts.length === 0 ?
                            <h5 style={{textAlign: "center"}}>No accounts</h5> :
                            <>
                                <h5 style={{textAlign: "center"}}>Account</h5>
                                <table className="table border text-center">
                                    <thead className="table-active">
                                    <tr>
                                        <th>Account №</th>
                                        <th>Number</th>
                                        <th>Balance</th>
                                        <th>Currency</th>
                                        <th>Last transaction Date</th>
                                        <th>Type</th>
                                        <th>Credit Limit</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {userAccounts.map((account) => {
                                        return (
                                            <tr key={account.id}>
                                                <th>{account.id}</th>
                                                <th>{account.number}</th>
                                                <th>{account.balance}</th>
                                                <th>{account.currency}</th>
                                                <th>{account.lastTransactionDate}</th>
                                                <th>{account.type}</th>
                                                <th>{account.creditLimit}</th>
                                                <th>{account.status}</th>
                                                <th>
                                                    <Link to={{
                                                        pathname: `/admin/accounts/${account.id}`,
                                                        state: account
                                                    }}>
                                                        Show more
                                                    </Link>
                                                </th>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </>}
                    </>
                }
            </div>
        </>
    );
};

export default ManageUser;