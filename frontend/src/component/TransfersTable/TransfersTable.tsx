import React, { FC, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";

import { Transfer } from "../../types/types";
import Spinner from "../Spinner/Spinner";
import { Link } from 'react-router-dom';

type PropsType = {
    transfers: Array<Transfer>
    loading: boolean
};

const TransfersTable: FC<PropsType> = ({ loading, transfers }) => {
    return (
        <div className="container">
            {loading ? <Spinner /> :
                <>
                    <h4><FontAwesomeIcon className="ml-2 mr-2" icon={faAddressCard} />Transfers:</h4>
                    <table className="table mt-4 border text-center">
                        <thead className="table-active">
                            <tr>
                                <th>Transfer №</th>
                                <th>Amount</th>
                                <th>Date and Time</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {transfers.map((transfer) => {
                                return (
                                    <tr key={transfer.id}>
                                        <th className={transfer.status === 'COMPLETE' ?
                                        "text-success" :
                                        "text-danger"}>
                                        {transfer.id}
                                    </th>
                                        <th>{transfer.amount}</th>
                                        <th>{transfer.dateTime.replace('T', ' ')}</th>

                                        {localStorage.getItem('role') === 'ADMIN' ?
                                            <th>
                                                <Link to={{
                                                    pathname: `/admin/transfers/${transfer.id}`,
                                                    state: transfer
                                                }}>
                                                    Show more
                                                </Link>
                                            </th> :
                                            <th>
                                                <Link to={{
                                                    pathname: `/user/transfers/${transfer.id}`,
                                                    state: transfer

                                                }}>
                                                    Show more
                                                </Link>
                                            </th>}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            }
        </div>
    );
};

export default TransfersTable;
