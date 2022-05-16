import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import { activateAccount } from "../../../redux/thunks/account-thunks";
import { formReset } from "../../../redux/thunks/auth-thunks";
import Spinner from '../../../component/Spinner/Spinner';

const AccountFinalize: FC<RouteComponentProps<{ code: string }>> = ({ match }) => {
    const dispatch = useDispatch();
    const loading: boolean = useSelector((state: AppStateType) => state.user.isLoaded);

    useEffect(() => {
        dispatch(formReset());

        if (match.params.code) {
            dispatch(activateAccount(match.params.code));
        }
    }, []);

    return (
        <div className="container">
            {loading ? <Spinner /> : <div className="">Account was activated successfully.</div>}
        </div>
    )
}

export default AccountFinalize;