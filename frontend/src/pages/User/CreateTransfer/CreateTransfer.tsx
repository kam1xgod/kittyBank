import React, { FC, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PageLoader from "../../../component/PageLoader/PageLoader";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import { fetchUserAccounts } from "../../../redux/thunks/account-thunks";
import { addTransfer, fetchUserTransfers } from "../../../redux/thunks/transfer-thunks";
import { Transfer, TransferError, Account } from "../../../types/types";
import { validateAmount } from "../../../utils/input-validators";

const CreateTransfer: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const error: string = useSelector((state: AppStateType) => state.transfer.error)
    const transferData: Partial<Transfer> = useSelector((state: AppStateType) => state.transfer.transfer);
    const transfers: Array<Transfer> = useSelector((state: AppStateType) => state.transfer.transfers)
    const userAccountsData: Array<Account> = useSelector((state: AppStateType) => state.account.accounts);
    const errors: Partial<TransferError> = useSelector((state: AppStateType) => state.transfer.errors);
    const loading: boolean = useSelector((state: AppStateType) => state.user.isLoaded);

    const [amount, setAmount] = useState<number | undefined>(transferData.amount);
    const [recipientNumber, setRecipientNumber] = useState<string | undefined>(transferData.recipientNumber);
    const [senderNumber, setSenderNumber] = useState<string | undefined>(transferData.senderNumber);
    const [validateAmountError, setValidateAmountError] = useState<string>("");

    const {
        recipientNumberError,
        amountError
    } = errors;

    useEffect(() => {
        dispatch(fetchUserTransfers());
    }, [])

    useEffect(() => {
        dispatch(fetchUserAccounts());
    }, [])

    const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const validateAmountError: string = validateAmount(amount);

        if (validateAmountError) {
            setValidateAmountError(validateAmountError);
        } else {
            setValidateAmountError("");
            const bodyFormData: FormData = new FormData();
            bodyFormData.append("transfer", new Blob([JSON.stringify({
                amount, senderNumber, recipientNumber
            })], {type: "application/json"}));
            dispatch(addTransfer(bodyFormData, history));
        }
    };

    let pageLoading;
    if (loading) {
        pageLoading = (<PageLoader />);
    }

    return (
        <div className="container mt-5 pb-5">
            {pageLoading}
            <h4 className="mb-4 text-center">
                Create transfer
            </h4>
            {error ? <div className="alert alert-danger col-6" role="alert">{error}</div> : null}
            <br />
            <form onSubmit={onFormSubmit}>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group row">
                            <label className="col-sm-5 col-form-label">Choose your account: </label>
                            <div className="col-sm-5">
                                <select value={senderNumber} onChange={(event) => setSenderNumber(event.target.value)}>
                                    <option className="form-control">---</option>
                                    {userAccountsData.map((account) => {
                                        return (
                                            <option className="form-control">{account.number}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-5 col-form-label">Amount: </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className={amountError ? "form-control is-invalid" : "form-control"}
                                    name="amount"
                                    value={amount}
                                    placeholder="Enter amount"
                                    onChange={(event) => setAmount(parseFloat(event.target.value))} />
                                <div className="invalid-feedback">{amountError}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-5 col-form-label">Recipient number: </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className={recipientNumberError ? "form-control is-invalid" : "form-control"}
                                    name="recipientNumber"
                                    value={recipientNumber}
                                    placeholder="Enter recipient number"
                                    onChange={(event) => setRecipientNumber(event.target.value)} />
                                <div className="invalid-feedback">{recipientNumberError}</div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg btn-success px-5 float-right">
                            Validate transfer
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateTransfer;