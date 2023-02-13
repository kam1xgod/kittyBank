import React, { FC, useEffect } from 'react';
import Spinner from "../../../component/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";

import AccountsTable from "../../../component/AccountsTable/AccountsTable";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import { fetchUserAccounts } from '../../../redux/thunks/account-thunks';
import { Account } from "../../../types/types";

const AccountsList: FC = () => {
    const dispatch = useDispatch();
    const userAccounts: Array<Account> = useSelector((state: AppStateType) => state.account.accounts);
    const loading: boolean = useSelector((state: AppStateType) => state.user.isLoaded);
    const error: string = useSelector((state: AppStateType) => state.account.error)
    const message: string = useSelector((state: AppStateType) => state.account.message)

    useEffect(() => {
        dispatch(fetchUserAccounts());
    }, [dispatch, message]);

    return (
        <>
              {error ? <h1>{error}</h1> : null}
              {message ? <h1>{message}</h1> : null}
            {loading ? <Spinner /> :
              userAccounts.length
              ? <AccountsTable loading={loading} accounts={userAccounts} />
              : <h5>You have no accounts yet.</h5>
            }
        </>);
};

export default AccountsList;
