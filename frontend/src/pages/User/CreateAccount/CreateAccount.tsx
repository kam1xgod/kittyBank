import React, { FC, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PageLoader from "../../../component/PageLoader/PageLoader";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import { addAccount, fetchUserAccounts } from "../../../redux/thunks/account-thunks";
import { fetchUserInfo } from "../../../redux/thunks/user-thunks";
import { Account, AccountError } from "../../../types/types";
import { accountTypeList, currencyList, paymentSystemList } from "../../../utils/constants/types";

const CreateAccount: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const accountData: Partial<Account> = useSelector((state: AppStateType) => state.account.account);
    const loading: boolean = useSelector((state: AppStateType) => state.user.isLoaded);

    const [type, setType] = useState<string | undefined>(accountData.type);
    const [currency, setCurrency] = useState<string | undefined>(accountData.currency);
    const [paymentSystem, setPaymentSystem] = useState<string | undefined>(accountData.paymentSystem);

    useEffect(() => {
        dispatch(fetchUserAccounts());
    }, [])

    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [])

    const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const mail = localStorage.getItem('mail');
        const type = "CARD";

        const bodyFormData: FormData = new FormData();
        bodyFormData.append("account", new Blob([JSON.stringify({
            type, mail, currency, paymentSystem
        })], { type: "application/json" }));
        dispatch(addAccount(bodyFormData, history));
    };

    // todo: may be create "CreateAccountTheme" and as parameter I can parse there type of page.
    // todo: but with this I'll need some pages like: CreateCardAccount, CreateCreditAccount, CreateSavingsAccount.

    let pageLoading;
    if (loading) {
        pageLoading = (<PageLoader />);
    }

    const onTypeChange = (type: string) => {
        switch (type.toString()) {
            case 'CREDIT':
                return (
                    <div className="">To open credit card you need to request it.</div>
                );
            case 'SAVINGS':
                return (
                    <div className="">To open savings account you need to choose plan.</div>
                );
            default:
                return (
                    <div>Choose what type of account you wanna open.</div>
                );
        }
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
                            <button type="submit" className="btn btn-primary btn-lg px-5 float-right">
                                Validate account
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateAccount;