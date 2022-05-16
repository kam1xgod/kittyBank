import React, { FC } from 'react';
import { Route, Switch, BrowserRouter, RouteComponentProps } from "react-router-dom";

import About from "../About/About";
import Footer from "../../component/Footer/Footer";
import HomePage from "../HomePage/HomePage";
import NavBar from "../../component/NavBar/NavBar";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import User from "../User/User";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ResetPassword from "../ResetPassword/ResetPassword";
import AdminPanel from '../AdminPanel/AdminPanel';
import SavingPlans from '../SavingPlans/SavingPlans';
import AccountFinalize from '../User/AccountFinalize/AccountFinalize';
import CreateSavingPlan from '../AdminPanel/ManageSavingPlan/CreateSavingPlan';
// import OAuth2RedirectHandler from "../../utils/oauth2/OAuth2RedirectHandler";

const App: FC = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/registration" component={Registration} />
                <Route exact path="/forgot" component={ForgotPassword} />
                <Route exact path="/reset/:code" component={ResetPassword} />
                <Route exact path="/activate/:code" component={Login} />
                <Route exact path="/account/activate/:code" component={(props: RouteComponentProps<{ code: string }>) => <AccountFinalize {...props} />} />
                <Route exact path="/contacts" component={About} />
                <Route exact path="/savings/plans" component={SavingPlans} />
                <Route path="/savings/create" component={() => <CreateSavingPlan />} />
                {localStorage.getItem("token") ?
                localStorage.getItem("role") === 'ADMIN' ?
                <Route path="/admin" component={AdminPanel}/> : <Route path="/user" component={User}/>
                : <Route path="/" component={HomePage} />}
            </Switch>
            <Footer />
        </>
    );
};

export default App;
