import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import TransfersTable from "../../../component/TransfersTable/TransfersTable";
import {AppStateType} from "../../../redux/reducers/root-reducer";
import { fetchAccountInfo } from '../../../redux/thunks/account-thunks';
import { fetchAllTransfers } from "../../../redux/thunks/admin-thunks";
import {Transfer} from "../../../types/types";

const TransfersList: FC = () => {
    const dispatch = useDispatch();
    const adminTransfers: Array<Transfer> = useSelector((state: AppStateType) => state.admin.transfers);
    const loading: boolean = useSelector((state: AppStateType) => state.admin.isLoaded);

    useEffect(() => {
        dispatch(fetchAllTransfers());
    }, []);

    return (<TransfersTable loading={loading} transfers={adminTransfers}/>);
};

export default TransfersList;
