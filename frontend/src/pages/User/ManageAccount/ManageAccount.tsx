import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { faIdCard, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { fetchAccountInfo } from '../../../redux/thunks/account-thunks';
import { fetchAccountTransfers } from '../../../redux/thunks/transfer-thunks';
import { Link, RouteComponentProps } from "react-router-dom";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import { Account, Transfer } from "../../../types/types";
import Spinner from '../../../component/Spinner/Spinner';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const ManageAccount: FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
    const dispatch = useDispatch();
    const accountData: Partial<Account> = useSelector((state: AppStateType) => state.account.account);
    const accountTransfers: Array<Transfer> = useSelector((state: AppStateType) => state.transfer.transfers);
    const loading: boolean = useSelector((state: AppStateType) => state.user.isLoaded);
    const { id, number, balance, currency, lastTransactionDate, type, creditLimit, status, card } = accountData;

    useEffect(() => {
        dispatch(fetchAccountInfo(match.params.id));
    }, []);

    useEffect(() => {
        dispatch(fetchAccountTransfers(match.params.id));
    }, []);

    return (
        <>
            <div className="container">
                {loading ? <Spinner /> :
                    <>
                        <h5 style={{ textAlign: "center" }}><FontAwesomeIcon className="mr-2" icon={faIdCard as IconProp} /> Account #{id}</h5>
                        <div className="row mt-5 mb-4 border px-3 py-3">
                            <div className="col-md-4">
                                <p className="personal_data_item">Balance:
                                    <span className="personal_data_text">{balance}</span>
                                </p>
                                <p className="personal_data_item">Currency:
                                    <span className="personal_data_text">{currency}</span>
                                </p>
                                <p className="personal_data_item">Last transaction date:
                                    <span className="personal_data_text">{lastTransactionDate}</span>
                                </p>
                            </div>
                            <div className="col-md-4">
                                <p className="personal_data_item">Type:
                                    <span className="personal_data_text">{type}</span>
                                </p>
                                {type === 'CREDIT' ?
                                    <>
                                        <p className="personal_data_item">Credit limit:
                                            <span className="personal_data_text">{creditLimit}</span>
                                        </p>
                                    </>
                                    :
                                    <>
                                    </>}
                                <p className="personal_data_item">Status:
                                    <span className="personal_data_text">{status}</span>
                                </p>
                            </div>
                        </div>
                        {type === "SAVING" ?
                            <>
                                <p className="personal_data_item">This type of account can't have any card.</p>
                            </> :
                            <>
                                <h5 style={{ textAlign: "center" }}><FontAwesomeIcon className="mr-2" icon={faCreditCard as IconProp} />Card:</h5>
                                <div className="row mt-5 mb-4 border px-3 py-3">
                                    <div className="col-md-4">
                                        <p className="personal_data_item">Number:
                                            <span className="personal_data_text">{card?.number}</span><br />
                                        </p>
                                        <p className="personal_data_item">MM/YY:
                                            <span className="personal_data_text">{card?.monthYear}</span>
                                        </p>
                                        <p className="personal_data_item">CVV:
                                            <span className="personal_data_text">{card?.cvv}</span>
                                        </p>
                                    </div>
                                </div>
                            </>
                        }
                        {accountTransfers.length === 0 ?
                            <h5 style={{ textAlign: "center" }}>No transfers</h5> :
                            <>
                                <h5 style={{ textAlign: "center" }}>Transfers</h5>
                                <table className="table border text-center">
                                    <thead className="table-active">
                                        <tr>
                                            <th>Transfer №</th>
                                            <th>Date and time</th>
                                            <th>Amount</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {accountTransfers.map((transfer) => {
                                            return (
                                                <tr key={transfer.id}>
                                                    <th className={transfer.status === 'COMPLETE' ?
                                                        "text-success" :
                                                        "text-danger"}>
                                                        {transfer.id}
                                                    </th>
                                                    <th>{transfer.dateTime.replace('T', ' ')}</th>
                                                    {transfer.recipientNumber === { number }.number ?
                                                        <th>+ {transfer.amount} {currency}</th> :
                                                        <th>- {transfer.amount} {currency}</th>
                                                    }
                                                    <th>
                                                        <Link to={{
                                                            pathname: `/user/transfers/${transfer.id}`,
                                                            state: transfer
                                                        }}>
                                                            Show more
                                                        </Link>
                                                    </th>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </>}
                    </>
                }
            </div>
        </>
    );
};

export default ManageAccount;