import React, { useEffect } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { AppStateType } from "../../redux/reducers/root-reducer";
import { addAccount } from "../../redux/thunks/account-thunks";
import { fetchSavingPlans } from "../../redux/thunks/plans-thunks";
import { SavingPlan } from "../../types/types";

const SavingPlans: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const savingPlans: Array<SavingPlan> = useSelector((state: AppStateType) => state.savingPlan.savingPlans);
    const loading: boolean = useSelector((state: AppStateType) => state.user.isLoaded);

    useEffect(() => {
        dispatch(fetchSavingPlans());
    }, [dispatch])

    const buttonClickHandler = (savingPlan: Partial<SavingPlan>) => {
        return (event: React.MouseEvent) => {
            event.preventDefault();
            const type = "SAVING";
            const mail = localStorage.getItem("mail");
            const canDeposit = savingPlan.canDeposit;
            const canWithdraw = savingPlan.canWithdraw;
            const capitalized = savingPlan.capitalized;
            const closable = savingPlan.closable;
            const percentage = savingPlan.percentage;
            const years = savingPlan.years;
            const min = savingPlan.min;
            const max = savingPlan.max;
            const currency = "RUB";

            const bodyFormData: FormData = new FormData();
            bodyFormData.append("account", new Blob([JSON.stringify({
                type, mail, canDeposit, canWithdraw, capitalized, closable,
                percentage, years, min, max, currency
            })], { type: "application/json" }));
            dispatch(addAccount(bodyFormData, history));
        }
    }

    return (
        <div className="border my-5 px-3 py-3" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

            {savingPlans.map((savingPlan) => {
                return (
                    <div className="col-md-2 border rounded my-3 mx-3 py-3 px-3">
                        <h4>{savingPlan.id}</h4>
                        <p>Deposit: {savingPlan.canDeposit ? "yes" : "no"}</p>
                        <p>Withdraw: {savingPlan.canWithdraw ? "yes" : "no"}</p>
                        <p>Capitalized: {savingPlan.capitalized ? "yes" : "no"}</p>
                        <p>Closable: {savingPlan.closable ? "yes" : "no"}</p>
                        <p>Percentage: {savingPlan.percentage}</p>
                        <p>Years: {savingPlan.years}</p>
                        <p>Min amount: {savingPlan.min}</p>
                        <p>Max amount: {savingPlan.max}</p>
                        <button type="submit" className="btn btn-primary btn-lg btn-success px-5 float-right" onClick={buttonClickHandler(savingPlan)}>
                            Open
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default SavingPlans;