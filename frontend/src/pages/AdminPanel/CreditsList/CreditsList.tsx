import React, { useEffect } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CreditsTable from "../../../component/CreditsTable/CreditsTable";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import { fetchAllCredits } from "../../../redux/thunks/admin-thunks";
import { Credit, CreditRequest, User } from "../../../types/types";

const CreditsList: FC = () => {
    const dispatch = useDispatch();
    const adminCredits: Array<Credit> = useSelector((state: AppStateType) => state.admin.credits);
    const loading: boolean = useSelector((state: AppStateType) => state.admin.isLoaded);

    useEffect(() => {
        dispatch(fetchAllCredits())
    }, [dispatch])

    return(<CreditsTable loading={loading} credits={adminCredits}/>);
};

export default CreditsList;