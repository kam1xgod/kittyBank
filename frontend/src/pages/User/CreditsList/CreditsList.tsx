import React, { useEffect } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CreditsTable from "../../../component/CreditsTable/CreditsTable";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import { fetchUserInfo } from "../../../redux/thunks/user-thunks";
import { addCreditRequest, fetchUserCredits } from "../../../redux/thunks/credit-thunks";
import { Credit, CreditRequest, User } from "../../../types/types";

const CreditsList: FC = () => {
    const dispatch = useDispatch();
    const accountCredits: Array<Credit> = useSelector((state: AppStateType) => state.credit.credits);
    const loading: boolean = useSelector((state: AppStateType) => state.user.isLoaded);
    // const userData: Partial<User> =  useSelector((state: AppStateType) => state.user.user);

    useEffect(() => {
        dispatch(fetchUserCredits());
        dispatch(fetchUserInfo());
        dispatch(addCreditRequest(localStorage.getItem("mail") as string));
    }, [])

    return(<CreditsTable loading={loading} credits={accountCredits}/>);
};

export default CreditsList;