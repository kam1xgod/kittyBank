import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { faIdCard, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { fetchTransfer } from '../../../redux/thunks/transfer-thunks';
import { Link, RouteComponentProps } from "react-router-dom";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import { Transfer } from "../../../types/types";
import Spinner from '../../../component/Spinner/Spinner';

const ManageTransfer: FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
    const dispatch = useDispatch();
    const transferData: Partial<Transfer> = useSelector((state: AppStateType) => state.transfer.transfer);
    const loading: boolean = useSelector((state: AppStateType) => state.transfer.loading);
    const { id, dateTime, status, commission, amount, senderNumber, recipientNumber } = transferData;

    useEffect(() => {
        dispatch(fetchTransfer(match.params.id));
    }, []);

    return (
        <>
            <div className="container">
                {loading ? <Spinner /> :
                    <>
                        <h5 style={{ textAlign: "center" }}><FontAwesomeIcon className="mr-2" icon={faIdCard} /> Transfer #{id}</h5>
                        <div className="row mt-5 mb-4 border px-3 py-3">
                            <div className="col-md-4">
                                <p className="personal_data_item">Date and time:
                                    <span className="personal_data_text">{dateTime}</span>
                                </p>
                                <p className="personal_data_item">Commission:
                                    <span className="personal_data_text">{commission}</span>
                                </p>
                                <p className="personal_data_item">Amount:
                                    <span className="personal_data_text">{amount}</span>
                                </p>
                            </div>
                            <div className="col-md-4">
                                <p className="personal_data_item">sender number:
                                    <span className="personal_data_text">{senderNumber}</span>
                                </p>

                                <p className="personal_data_item">Recipient number:
                                    <span className="personal_data_text">{recipientNumber}</span>
                                </p>
                                <p className="personal_data_item">Status:
                                    <span className="personal_data_text">{status}</span>
                                </p>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    );
};

export default ManageTransfer;