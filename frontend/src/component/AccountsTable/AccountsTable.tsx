import React, { FC } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";

import { Account } from "../../types/types";
import Spinner from "../Spinner/Spinner";

type PropsType = {
    accounts: Array<Account>
    loading: boolean
};

const AccountsTable: FC<PropsType> = ({ loading, accounts }) => {
    return (
        <div className="container">
            {loading ? <Spinner /> :
                <>
                    <h4><FontAwesomeIcon className="ml-2 mr-2" icon={faAddressCard} />Accounts:</h4>
                    <table className="table mt-4 border text-center">
                        <thead className="table-active">
                            <tr>
                                <th>Account №</th>
                                <th>Number</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((account) => {
                                return (
                                    <tr key={account.id}>
                                        <th>{account.id}</th>
                                        <th>{account.number}</th>
                                        {localStorage.getItem('role') === 'ADMIN' ?
                                        <th>
                                            <Link to={{
                                                pathname: `/admin/accounts/${account.id}`,
                                                state: account
                                            }}>
                                                Show more
                                            </Link>
                                        </th> :
                                        <th>
                                            <Link to={{
                                                pathname: `/user/accounts/${account.id}`,
                                                state: account

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
        </div >
    );
};

export default AccountsTable;
