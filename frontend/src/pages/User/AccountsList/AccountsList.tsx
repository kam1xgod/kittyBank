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

    useEffect(() => {
        dispatch(fetchUserAccounts());
    }, [dispatch]);

    return (
        <>
            {loading ? <Spinner /> :
                <AccountsTable loading={loading} accounts={userAccounts} />
            }
        </>);
};

export default AccountsList;
