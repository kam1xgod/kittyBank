import React, {FC, FormEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faKey, faPaperPlane} from "@fortawesome/free-solid-svg-icons";

import {forgotPassword, formReset} from "../../redux/thunks/auth-thunks";
import {validateEmail} from "../../utils/input-validators";
import PageLoader from "../../component/PageLoader/PageLoader";
import {AppStateType} from "../../redux/reducers/root-reducer";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const ForgotPassword: FC = () => {
    const dispatch = useDispatch();
    const error: string = useSelector((state: AppStateType) => state.auth.error);
    const success: string = useSelector((state: AppStateType) => state.auth.success);
    const loading: boolean = useSelector((state: AppStateType) => state.auth.loading);
    const [mail, setEmail] = useState<string>("");
    const [validateEmailError, setValidateEmailError] = useState<string>("");

    useEffect(() => {
        dispatch(formReset());
    }, []);

    useEffect(() => {
        setEmail("");
    }, [success]);

    const onClickSend = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const validateEmailError: string = validateEmail(mail);

        if (validateEmailError) {
            setValidateEmailError(validateEmailError);
        } else {
            dispatch(forgotPassword({mail: mail}));
        }
    };

    let pageLoading;

    if (loading) {
        pageLoading = (<PageLoader/>);
    }

    return (
        <div id="container" className="container mt-5">
            {pageLoading}
            <h4><FontAwesomeIcon className="mr-3" icon={faKey as IconProp}/>FORGOT PASSWORD?</h4>
            <hr/>
            <p>Enter your email address that you used to create your account.</p>
            {error ? <div className="alert alert-danger col-6" role="alert">{error}</div> : null}
            {success ? <div className="alert alert-success col-6" role="alert">{success}</div> : null}
            <form onSubmit={onClickSend}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">E-mail: </label>
                    <FontAwesomeIcon style={{position: "relative", top: "8px"}} icon={faEnvelope as IconProp}/>
                    <div className="col-sm-4">
                        <input
                            type="mail"
                            name="mail"
                            value={mail}
                            className={validateEmailError ? "form-control is-invalid" : "form-control"}
                            onChange={(event) => setEmail(event.target.value)}/>
                        <div className="invalid-feedback">{validateEmailError}</div>
                    </div>
                </div>
                <div className="form-group row">
                    <button type="submit" className="btn btn-dark mx-3">
                        <FontAwesomeIcon className="mr-3" icon={faPaperPlane as IconProp}/>Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
