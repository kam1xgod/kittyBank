import React, {FC, FormEvent, useEffect, useState} from 'react';
import {Link, RouteComponentProps, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faSignInAlt} from "@fortawesome/free-solid-svg-icons";

import {activateUser, formReset, login} from "../../redux/thunks/auth-thunks";
import {AppStateType} from "../../redux/reducers/root-reducer";
import {UserData} from "../../types/types";
// import googleLogo from "../../img/google.png";
// import facebookLogo from "../../img/facebook.png";
// import githubLogo from "../../img/github.png";
import "./Login.css";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const Login: FC<RouteComponentProps<{ code: string }>> = ({match}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const error: string = useSelector((state: AppStateType) => state.auth.error);
    const success: string = useSelector((state: AppStateType) => state.auth.success);
    const [mail, setMail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        dispatch(formReset());

        if (match.params.code) {
            dispatch(activateUser(match.params.code));
        }
    }, []);

    const onClickSignIn = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const userData: UserData = {mail, password}
        dispatch(login(userData, history));
    };

    return (
        <div id="container" className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <h4><FontAwesomeIcon className="mr-3" icon={faSignInAlt as IconProp}/>SIGN IN</h4>
                    <hr/>
                    {error ? <div className="alert alert-danger col-6" role="alert">{error}</div> : null}
                    {success ? <div className="alert alert-success col-6" role="alert">{success}</div> : null}
                    <form onSubmit={onClickSignIn}>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">E-mail: </label>
                            <FontAwesomeIcon style={{position: "relative", top: "8px"}} icon={faEnvelope as IconProp}/>
                            <div className="col-sm-7">
                                <input
                                    className="form-control"
                                    type="mail"
                                    name="mail"
                                    value={mail}
                                    onChange={(event) => setMail(event.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Password: </label>
                            <FontAwesomeIcon style={{position: "relative", top: "8px"}} icon={faLock as IconProp}/>
                            <div className="col-sm-7">
                                <input
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <button type="submit" className="btn btn-dark mx-3">
                                <FontAwesomeIcon className="mr-3" icon={faSignInAlt as IconProp}/>Sign in
                            </button>
                            <Link to={"/forgot"} style={{position: "relative", top: "8px"}}>Forgot password?</Link>
                        </div>
                    </form>
                </div>
                <div className="col-md-6">
                    <div className="mt-5">
                        <p>asd</p>
                        {/* todo: may be some images here? */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
