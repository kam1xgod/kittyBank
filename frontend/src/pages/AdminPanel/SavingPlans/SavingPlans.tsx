import React, { useEffect } from "react";
import { FC } from "react";
import Spinner from "../../../component/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import { fetchSavingPlans } from "../../../redux/thunks/plans-thunks";
import { SavingPlan } from "../../../types/types";

const SavingPlans: FC = () => {
    const dispatch = useDispatch();
    const savingPlans: Array<SavingPlan> = useSelector((state: AppStateType) => state.savingPlan.savingPlans);
    const loading: boolean = useSelector((state: AppStateType) => state.user.isLoaded);

    useEffect(() => {
        dispatch(fetchSavingPlans());
    }, [dispatch])

    return (
        <div className="border my-5 px-3 py-3" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {loading ? <Spinner /> :
            <>
                {savingPlans.map((savingPlan) => {
                    return (
                        <div className="col-md-2 border rounded my-3 mx-3">
                            <h4>{savingPlan.id}</h4>
                            <p>Deposit: {savingPlan.canDeposit ? "yes" : "no"}</p>
                            <p>Withdraw: {savingPlan.canWithdraw ? "yes" : "no"}</p>
                            <p>Capitalized: {savingPlan.capitalized ? "yes" : "no"}</p>
                            <p>Closable: {savingPlan.closable ? "yes" : "no"}</p>
                            <p>Percentage: {savingPlan.percentage}</p>
                            <p>Years: {savingPlan.years}</p>
                            <p>Min amount: {savingPlan.min}</p>
                            <p>Max amount: {savingPlan.max}</p>
                            <NavLink to={{
                                pathname: `/admin/savings/${savingPlan.id}`,
                                state: savingPlan
                            }}
                                className="admin-sidebar-link nav-link border my-2 px-2 py-2"
                                activeClassName="is-active"
                                style={{ backgroundColor: "aquamarine", textAlign: "center" }}>Edit</NavLink>
                            <NavLink to={{
                                pathname: `/admin/savings/${savingPlan.id}/delete`,
                                state: savingPlan
                            }}
                                className="admin-sidebar-link nav-link border my-2 px-2 py-2"
                                activeClassName="is-active"
                                style={{ backgroundColor: "aquamarine", textAlign: "center" }}>Delete</NavLink>
                        </div>
                    )
                })}
                <NavLink to={"/savings/create"}
                    className="admin-sidebar-link nav-link border my-2 px-2 py-2"
                    activeClassName="is-active"
                    style={{ backgroundColor: "aquamarine", textAlign: "center" }}>Add new</NavLink>
            </>}
        </div>
    )
}

export default SavingPlans;