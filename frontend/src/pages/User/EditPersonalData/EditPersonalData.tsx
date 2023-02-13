import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

import {User, UserEdit, UserEditErrors} from "../../../types/types";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/reducers/root-reducer";
import {resetForm, updateUserInfo} from '../../../redux/thunks/user-thunks';
import "./EditPersonalData.css";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Button } from '../../../component/Input/Button';

const EditPersonalData: FC = () => {
    const dispatch = useDispatch();
    const usersData: Partial<User> = useSelector((state: AppStateType) => state.user.user);
    const errors: Partial<UserEditErrors> = useSelector((state: AppStateType) => state.user.userEditErrors);
    const [user, setUser] = useState<Partial<User>>(usersData);
    const {id, firstname, lastname} = user;
    const {firstNameError, lastNameError} = errors;

    useEffect(() => {
        dispatch(resetForm());
    }, []);

    const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const userEdit: UserEdit = {id, firstname, lastname};
        dispatch(updateUserInfo(userEdit));
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    };

    return (
        <>
            <form className="edit_personal_data" onSubmit={onFormSubmit}>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">First name: </label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className={firstNameError ? "form-control is-invalid" : "form-control"}
                            name="firstName"
                            value={firstname}
                            onChange={handleInputChange}/>
                        <div className="invalid-feedback">{firstNameError}</div>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Last name: </label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className={lastNameError ? "form-control is-invalid" : "form-control"}
                            name="lastName"
                            value={lastname}
                            onChange={handleInputChange}/>
                        <div className="invalid-feedback">{lastNameError}</div>
                    </div>
                </div>
                <Button type='submit'>
                    <FontAwesomeIcon className="mr-2" icon={faCheck as IconProp}/>Save
                </Button>
            </form>
        </>
    );
};

export default EditPersonalData;
