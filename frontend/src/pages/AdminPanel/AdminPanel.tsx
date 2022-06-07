import React, { FC, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { NavLink, Redirect, Route, RouteComponentProps, Router } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { formReset } from "../../redux/thunks/admin-thunks";
import { fetchUserInfo } from "../../redux/thunks/user-thunks";
import UsersList from "./UsersList/UsersList";
import ManageUser from "./ManageUser/ManageUser";
import "./AdminPanel.css";
import AccountsList from './AccountsList/AccountsList';
import ManageAccount from './ManageAccount/ManageAccount';
import TransfersList from './TransfersList/TransfersList';
import ManageTransfer from './ManageTransfer/ManageTransfer';
import CreditsList from './CreditsList/CreditsList';
import SavingPlans from './SavingPlans/SavingPlans';
import ManageCredit from './ManageCredit/ManageCredit';
import ManageSavingPlan from './ManageSavingPlan/ManageSavingPlan';
import CreateSavingPlan from './ManageSavingPlan/CreateSavingPlan';
import CreditCardRequests from './CreditCardRequests/CreditCardRequests';
import CreateCreditAccount from './CreateCreditAccount/CreateCreditAccount';
import CreditCardRequestDecline from './CreditCardRequests/CreditCardRequestDecline';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const AdminPanel: FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(formReset());
        dispatch(fetchUserInfo());
    }, [dispatch]);

    return (
        <div className="admin-container container">
            <div className="row mt-5">
                <div className="col-md-2">
                    <h4><FontAwesomeIcon className="mr-2" icon={faUser as IconProp} />Admin</h4>
                    <NavLink to={"/admin/users"}
                        className="admin-sidebar-link nav-link"
                        activeClassName="is-active">Users</NavLink>
                    <NavLink to={"/admin/accounts"}
                        className="admin-sidebar-link nav-link"
                        activeClassName="is-active">Accounts</NavLink>
                    <NavLink to={"/admin/transfers"}
                        className="admin-sidebar-link nav-link"
                        activeClassName="is-active">Transfers</NavLink>
                    <NavLink to={"/admin/credits"}
                        className="admin-sidebar-link nav-link"
                        activeClassName="is-active">Credits</NavLink>


                    <NavLink to={"/admin/savings"}
                        className="admin-sidebar-link nav-link"
                        activeClassName="is-active">Savings plans</NavLink>
                    <NavLink to={"/savings/create"}
                        className="admin-sidebar-link nav-link"
                        activeClassName="is-active">Create new savings plan</NavLink>
                    <NavLink to={"/admin/requests"}
                        className="admin-sidebar-link nav-link"
                        activeClassName="is-active">Credit card's requests</NavLink>
                </div>
                <div className="col-md-10">
                    <Route path="/admin/users" component={() => <UsersList />} />
                    <Route path="/admin/users/:id" component={(props: RouteComponentProps<{ id: string }>) => <ManageUser {...props} />} />

                    <Route path="/admin/accounts" component={() => <AccountsList />} />
                    <Route path="/admin/accounts/:id" component={(props: RouteComponentProps<{ id: string }>) => <ManageAccount {...props} />} />

                    <Route path="/admin/transfers" component={() => <TransfersList />} />
                    <Route path="/admin/transfers/:id" component={(props: RouteComponentProps<{ id: string }>) => <ManageTransfer {...props} />} />

                    <Route path="/admin/credits" component={() => <CreditsList />} />
                    <Route path="/admin/credits/:id" component={(props: RouteComponentProps<{ id: string }>) => <ManageCredit {...props} />} />
                    <Route path="/admin/requests" component={() => <CreditCardRequests/> } />
                    <Route path="/admin/requests/:mail/approve" component={(props: RouteComponentProps<{ mail: string}>) => <CreateCreditAccount {...props}/>} />
                    <Route path="/admin/requests/:mail/decline" component={(props: RouteComponentProps<{ mail: string}>) => <CreditCardRequestDecline {...props}/> } />

                    <Route path="/admin/savings" component={() => <SavingPlans />} />
                    <Route path="/admin/savings/:id" component={(props: RouteComponentProps<{ id: string }>) => <ManageSavingPlan {...props} />} />
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;