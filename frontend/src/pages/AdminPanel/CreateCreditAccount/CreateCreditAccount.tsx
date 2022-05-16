import React, { FormEvent, useEffect, useState } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, RouteComponentProps, useHistory } from "react-router-dom";
import PageLoader from "../../../component/PageLoader/PageLoader";
import Spinner from "../../../component/Spinner/Spinner";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import { addAccount } from "../../../redux/thunks/account-thunks";
import { fetchCreditRequests } from "../../../redux/thunks/admin-thunks";
import { Account, AccountError, CreditRequest } from "../../../types/types";
import { currencyList, paymentSystemList } from "../../../utils/constants/types";

const CreateCreditAccount: FC<RouteComponentProps<{ mail: string }>> = ({ match }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const accountData: Partial<Account> = useSelector((state: AppStateType) => state.admin.account);
    const loading: boolean = useSelector((state: AppStateType) => state.admin.isLoaded);
    const errors: Partial<AccountError> = useSelector((state: AppStateType) => state.account.error);

    const [currency, setCurrency] = useState<string | undefined>(accountData.currency);
    const [paymentSystem, setPaymentSystem] = useState<string | undefined>(accountData.paymentSystem);
    const [creditLimit, setCreditLimit] = useState<number | undefined>(accountData.creditLimit)
    const [percentage, setPercentage] = useState<number | undefined>(accountData.percentage);

    const {
        percentageError,
        creditLimitError
    } = errors;

    const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const mail = match.params.mail;
        const type = "CREDIT";

        const bodyFormData: FormData = new FormData();
        bodyFormData.append("account", new Blob([JSON.stringify({
            type, mail, currency, paymentSystem,
            creditLimit, percentage
        })], { type: "application/json" }));
        dispatch(addAccount(bodyFormData, history));
    };

    let pageLoading;
    if (loading) {
        pageLoading = (<PageLoader />);
    }

    return (
        <div className="container mt-5 pb-5">
            {pageLoading}
            <h4 className="mb-4 text-center">
                Open account
            </h4>
            <br />
            <p className="">Note: if you want to create credit or savings account go to Request new or Saving plans tabs.</p>
            <div className="container mt-5 pb-5">
                <form onSubmit={onFormSubmit}>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group row">
                                <label className="col-sm-5 col-form-label">Choose currency: </label>
                                <div className="col-sm-5">
                                    <select value={currency} onChange={(event) => setCurrency(event.target.value)}>
                                        <option className="form-control">---</option>
                                        {
                                            currencyList.map((currency) => {
                                                return (
                                                    <option className="form-control">{currency}</option>
                                                );
                                            })}
                                    </select>
                                    <div className="invalid-feedback">{currency}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-5 col-form-label">Payment system: </label>
                                <div className="col-sm-6">
                                    <select value={paymentSystem} onChange={(event) => setPaymentSystem(event.target.value)}>
                                        <option className="form-control">---</option>
                                        {
                                            paymentSystemList.map((paymentSystem) => {
                                                return (
                                                    <option className="form-control">{paymentSystem}</option>
                                                );
                                            })}
                                    </select>
                                    <div className="invalid-feedback">{paymentSystem}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-5 col-form-label">Credit limit: </label>
                                <div className="col-sm-5">
                                    <input
                                        type="text"
                                        className={creditLimit ? "form-control is-invalid" : "form-control"}
                                        value={creditLimit}
                                        name="creditLimit"
                                        placeholder="Enter credit limit"
                                        onChange={(event) => setCreditLimit(parseInt(event.target.value))} />
                                    <div className="invalid-feedback">{creditLimitError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-5 col-form-label">Percentage: </label>
                                <div className="col-sm-5">
                                    <input
                                        type="text"
                                        className={percentage ? "form-control is-invalid" : "form-control"}
                                        value={percentage}
                                        name="percentage"
                                        placeholder="Enter percentage"
                                        onChange={(event) => setPercentage(parseInt(event.target.value))} />
                                    <div className="invalid-feedback">{percentageError}</div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg btn-success px-5 float-right">
                                Validate account
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateCreditAccount;