import React, { useEffect } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router-dom";
import Spinner from "../../../component/Spinner/Spinner";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import { deleteCreditRequest } from "../../../redux/thunks/credit-thunks";

const CreditCardRequestDecline: FC<RouteComponentProps<{ mail: string }>> = ({ match }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const loading: boolean = useSelector((state: AppStateType) => state.user.isLoaded);

    useEffect(() => {
        dispatch(deleteCreditRequest(match.params.mail, history));
    }, [dispatch])

    return (
        <div className="container">
            {loading ? <Spinner /> : <>
            <p>Hello</p>
            </>}
        </div>
    )
}

export default CreditCardRequestDecline;