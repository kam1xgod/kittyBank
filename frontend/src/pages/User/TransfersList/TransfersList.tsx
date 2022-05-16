import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import TransfersTable from "../../../component/TransfersTable/TransfersTable";
import {AppStateType} from "../../../redux/reducers/root-reducer";
import { fetchUserTransfers } from '../../../redux/thunks/transfer-thunks';
import {Transfer} from "../../../types/types";

const TransfersList: FC = () => {
    const dispatch = useDispatch();
    const accountTransfers: Array<Transfer> = useSelector((state: AppStateType) => state.transfer.transfers);
    const loading: boolean = useSelector((state: AppStateType) => state.user.isLoaded);

    useEffect(() => {
        dispatch(fetchUserTransfers());
    }, [dispatch]);

    return (<TransfersTable loading={loading} transfers={accountTransfers}/>);
};

export default TransfersList;
