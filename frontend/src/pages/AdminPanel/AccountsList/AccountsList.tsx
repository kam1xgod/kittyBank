import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import AccountsTable from "../../../component/AccountsTable/AccountsTable";
import {AppStateType} from "../../../redux/reducers/root-reducer";
import { fetchAllAccounts } from '../../../redux/thunks/admin-thunks';
import {Account} from "../../../types/types";

const AccountsList: FC = () => {
    const dispatch = useDispatch();
    const adminAccounts: Array<Account> = useSelector((state: AppStateType) => state.admin.accounts);
    const loading: boolean = useSelector((state: AppStateType) => state.admin.isLoaded);

    useEffect(() => {
        dispatch(fetchAllAccounts());
    }, []);

    return (<AccountsTable loading={loading} accounts={adminAccounts}/>);
};

export default AccountsList;
