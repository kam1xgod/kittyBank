import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { RouteComponentProps } from "react-router-dom";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import { Credit } from "../../../types/types";
import Spinner from '../../../component/Spinner/Spinner';
import { fetchCreditInfo } from '../../../redux/thunks/admin-thunks';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const ManageCredit: FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
    const dispatch = useDispatch();
    const creditData: Partial<Credit> = useSelector((state: AppStateType) => state.admin.credit);
    const loading: boolean = useSelector((state: AppStateType) => state.admin.isLoaded);
    const { id, date, status, daysLeft, total, penalty } = creditData;

    useEffect(() => {
        dispatch(fetchCreditInfo(match.params.id));
    }, []);

    return (
        <div className="container">
            {loading ? <Spinner /> :
                <>
                    <h4><FontAwesomeIcon className="mr-2" icon={faUserEdit as IconProp} /> Credit #{id}</h4>
                    <div className="row mt-5 mb-4 border px-3 py-3">
                        <div className="col-md-4">
                            <p className="personal_data_item">Date:
                                <span className="personal_data_text">{date}</span>
                            </p>
                            <p className="personal_data_item">Days Left:
                                <span className="personal_data_text">{daysLeft}</span>
                            </p>
                            <p className="personal_data_item">Status:
                                <span className="personal_data_text">{status}</span>
                            </p>
                            <p className="personal_data_item">Total:
                                <span className="personal_data_text">{total}</span>
                            </p>
                            <p className="personal_data_item">Penalty:
                                <span className="personal_data_text">{penalty}</span>
                            </p>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default ManageCredit;