import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { RouteComponentProps, useHistory } from "react-router-dom";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import { SavingPlan } from "../../../types/types";
import Spinner from '../../../component/Spinner/Spinner';
import { fetchSavingPlanInfo } from '../../../redux/thunks/admin-thunks';
import { addSavingPlan, editSavingPlan } from '../../../redux/thunks/plans-thunks';
import { fetchAllSavingPlans } from '../../../redux/thunks/admin-thunks';

type InitialStateType = {
    years: number,
    canDeposit: boolean,
    canWithdraw: boolean,
    capitalized: boolean,
    closable: boolean,
    max: number,
    min: number,
    percentage: number
};

const ManageSavingPlan: FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const savingPlanData: Partial<SavingPlan> = useSelector((state: AppStateType) => state.admin.savingPlan);
    const isSavingPlanAdded: boolean = useSelector((state: AppStateType) => state.admin.isSavingPlanAdded);
    const loading: boolean = useSelector((state: AppStateType) => state.admin.isLoaded);

    const initialState: InitialStateType = {
        years: savingPlanData.years as number,
        canDeposit: savingPlanData.canDeposit as boolean,
        canWithdraw: savingPlanData.canWithdraw as boolean,
        capitalized: savingPlanData.capitalized as boolean,
        closable: savingPlanData.closable as boolean,
        max: savingPlanData.max as number,
        min: savingPlanData.min as number,
        percentage: savingPlanData.percentage as number
    }

    const [{
        years,
        canDeposit,
        canWithdraw,
        capitalized,
        closable,
        max,
        min,
        percentage
    }, setState] = useState(initialState);

    useEffect(() => {
        if (isSavingPlanAdded) {
            setState({ ...initialState });
            window.scrollTo(0, 0);
            dispatch(fetchAllSavingPlans());
        }
    }, [isSavingPlanAdded])

    useEffect(() => {
        dispatch(fetchSavingPlanInfo(match.params.id));
    }, []);

    const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const bodyFormData: FormData = new FormData();
        bodyFormData.append("plan", new Blob([JSON.stringify({
            years, canDeposit, canWithdraw, capitalized,
            closable, max, min, percentage
        })], { type: "application/json" }));

        if (savingPlanData.id) {
            dispatch(editSavingPlan(savingPlanData.id.toString(), bodyFormData, history));
        } else {
            dispatch(addSavingPlan(bodyFormData, history));

        }
    }

    const handleToggle = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, checked } = event.target;
        setState(prevState => ({ ...prevState, [name]: checked }));
    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    return (
        <div className="container">
            {loading ? <Spinner /> :
                <>
                    <div className="mt-5 mb-4 border px-3 py-3">
                        <form onSubmit={onFormSubmit}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group row">
                                        <label className="col-sm-5 personal_data_item">Deposit?</label>
                                        <input
                                            type="checkbox"
                                            onChange={handleToggle}
                                            className="mx-2"
                                            key="canDeposit"
                                            name="canDeposit"
                                            value={`${canDeposit}`}
                                            checked={canDeposit}
                                        />
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-5 personal_data_item">Withdraw?</label>
                                        <input
                                            type="checkbox"
                                            onChange={handleToggle}
                                            className="mx-2"
                                            key="canWithdraw"
                                            name="canWithdraw"
                                            value={`${canWithdraw}`}
                                            checked={canWithdraw}
                                        />
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-5 personal_data_item">Capitalized?</label>
                                        <input
                                            type="checkbox"
                                            onChange={handleToggle}
                                            className="mx-2"
                                            key="capitalized"
                                            name="capitalized"
                                            value={`${capitalized}`}
                                            checked={capitalized}
                                        />
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-5 personal_data_item">Closable?</label>
                                        <input
                                            type="checkbox"
                                            onChange={handleToggle}
                                            className="mx-2"
                                            key="closable"
                                            name="closable"
                                            value={`${closable}`}
                                            checked={closable}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group row">
                                        <label className="col-sm-5 col-form-label">Percentage:</label>
                                        <input
                                            type="text"
                                            value={percentage}
                                            name="percentage"
                                            onChange={onInputChange} />
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-5 col-form-label">Years:</label>
                                        <input
                                            type="text"
                                            value={years}
                                            name="years"
                                            onChange={onInputChange} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group row">
                                        <label className="col-sm-5 col-form-label">Min:</label>
                                        <input
                                            type="text"
                                            value={min}
                                            name="min"
                                            onChange={onInputChange} />
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-5 col-form-label">Max:</label>
                                        <input
                                            type="text"
                                            value={max}
                                            name="max"
                                            onChange={onInputChange} />
                                    </div>
                                </div>
                                <div className="container" style={{ display: "flex", justifyContent: "center" }}>
                                    <button type="submit" className="btn btn-primary btn-lg btn-success px-5 float-right">
                                        Validate saving plan
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </>
            }
        </div>
    );
};

export default ManageSavingPlan;