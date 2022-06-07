import React, { FC, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";

import { Credit } from "../../types/types";
import Spinner from "../Spinner/Spinner";
import { Link } from 'react-router-dom';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type PropsType = {
    credits: Array<Credit>
    loading: boolean
};

const TransfersTable: FC<PropsType> = ({ loading, credits }) => {
    return (
        <div className="container">
            {loading ? <Spinner /> :
                <>
                    <h4><FontAwesomeIcon className="ml-2 mr-2" icon={faAddressCard as IconProp} />Credits:</h4>
                    <table className="table mt-4 border text-center">
                        <thead className="table-active">
                            <tr>
                                <th>Credit №</th>
                                <th>Total</th>
                                <th>Days left</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {credits.map((credit) => {
                                return (
                                    <tr key={credit.id}>
                                        <th className={credit.status === 'CLOSED' ?
                                        "text-success" :
                                        "text-warning"}>
                                        {credit.id}
                                    </th>
                                        <th>{credit.total}</th>
                                        <th>{credit.daysLeft > 0 ? credit.daysLeft : "Overdue"}</th>

                                        {localStorage.getItem('role') === 'ADMIN' ?
                                            <th>
                                                <Link to={{
                                                    pathname: `/admin/credits/${credit.id}`,
                                                    state: credit
                                                }}>
                                                    Show more
                                                </Link>
                                            </th> :
                                            <th>
                                                <Link to={{
                                                    pathname: `/user/credits/${credit.id}`,
                                                    state: credit

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
