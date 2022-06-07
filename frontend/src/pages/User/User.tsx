import React, { FC, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { NavLink, Redirect, Route, RouteComponentProps, Router } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { formReset } from "../../redux/thunks/admin-thunks";
import { fetchUserInfo } from "../../redux/thunks/user-thunks";
import ChangePassword from "./ChangePassword/ChangePassword";
import PersonalData from "./PersonalData/PersonalData";
import UserItem from "./UserItem";
import "./User.css";
import AccountsList from './AccountsList/AccountsList';
import ManageAccount from './ManageAccount/ManageAccount';
import TransfersList from './TransfersList/TransfersList';
import ManageTransfer from './ManageTransfer/ManageTransfer';
import CreateTransfer from './CreateTransfer/CreateTransfer';
import CreateAccount from './CreateAccount/CreateAccount';
import CreditsList from './CreditsList/CreditsList';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const User: FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(formReset());
        dispatch(fetchUserInfo());
    }, [dispatch]);

    return (
        <div className="user-container container">
            <div className="row mt-5">
                <div className="col-md-2">
                    <h4><FontAwesomeIcon className="mr-2" icon={faUser as IconProp} />
                        <NavLink to={"/user"}
                            className="user-sidebar-link">My Account</NavLink>
                    </h4>
                    <NavLink to={"/user/info"}
                        className="user-sidebar-link nav-link"
                        activeClassName="is-active">Personal data</NavLink>
                    <NavLink to={"/user/transfers"}
                        className="user-sidebar-link nav-link"
                        activeClassName="is-active">Transfers</NavLink>
                    <NavLink to={"/user/transfers/new"}
                        className="user-sidebar-link nav-link"
                        activeClassName="is-active">---Create new</NavLink>
                    <NavLink to={"/user/credits"}
                        className="user-sidebar-link nav-link"
                        activeClassName="is-active">Credits</NavLink>
                    <NavLink to={"/user/credits/request-new"}
                        className="user-sidebar-link nav-link"
                        activeClassName="is-active">---Request new</NavLink>
                    <NavLink to={"/user/account/new"}
                        className="user-sidebar-link nav-link"
                        activeClassName="is-active">Open new account</NavLink>
                    <NavLink to={"/user/edit"}
                        className="user-sidebar-link nav-link"
                        activeClassName="is-active">Change password</NavLink>
                </div>
                <div className="col-md-10">
                    <Route exact path="/user" component={() => <UserItem />} />
                    <Route exact path="/user" component={() => <AccountsList />} />
                    <Route path="/user/info" component={() => <PersonalData />} />
                    <Route path="/user/edit" component={() => <ChangePassword />} />
                    <Route path="/user/accounts" component={() => <AccountsList />} />
                    <Route path="/user/account/new" component={() => <CreateAccount />} />
                    <Route path="/user/accounts/:id" component={(props: RouteComponentProps<{ id: string }>) => <ManageAccount {...props} />} />
                    <Route path="/user/transfers" component={() => <TransfersList />} />
                    <Route path="/user/transfers/new" component={() => <CreateTransfer />} />
                    <Route path="/user/transfers/:id" component={(props: RouteComponentProps<{ id: string }>) => <ManageTransfer {...props} />} />
                    <Route path="/user/credits" component={() => <CreditsList />} />
                </div>
            </div>
        </div>
    );
};

export default User;
