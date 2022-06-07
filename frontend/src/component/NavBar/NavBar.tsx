import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faSignOutAlt, faUser, faUserPlus} from "@fortawesome/free-solid-svg-icons";

import {logout} from "../../redux/thunks/auth-thunks";
import "./NavBar.css";
import {AppStateType} from "../../redux/reducers/root-reducer";

const NavBar: FC = () => {
    const dispatch = useDispatch();
    const isLoggedIn: boolean = useSelector((state: AppStateType) => state.user.isLoggedIn);

    const handleLogout = () => {
        dispatch(logout())
    };

    let links;
    let signOut;

    if (localStorage.getItem("isLoggedIn") || isLoggedIn) {
        links = (
            <li className="nav-item">
                <Link to={localStorage.getItem("role") === 'ADMIN' ? "/admin" : "/user"}><span className="nav-link pl-5 pr-5">
                         <FontAwesomeIcon className="mr-2" icon={faUser}/>MY ACCOUNT</span></Link>
            </li>
        );
        signOut = (
            <Link to={"/"} onClick={handleLogout}>
                <FontAwesomeIcon className="mr-2" icon={faSignOutAlt}/>EXIT
            </Link>
        );
    } else {
        links = (
            <>
                <li className="nav-item">
                    <Link to={"/login"} className="nav-link pl-5 pr-3">
                        <FontAwesomeIcon className="mr-2" icon={faSignInAlt}/>SIGN IN</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/registration"} className="nav-link">
                        <FontAwesomeIcon className="mr-2" icon={faUserPlus}/>SIGN UP</Link>
                </li>
            </>
        );
        signOut = null;
    }

    return (
        <div>
            <div id="header" className="container-fluid header-top d-none d-md-block pb-5 pt-5">
                {/* <img src="https://i.pinimg.com/564x/be/b5/fd/beb5fd92bdb0e2d8fc1e4328a5d5247e.jpg" className="rounded mx-auto d-block"/> */}
                <img src="https://i.imgur.com/i4y7Alt.png" className="rounded mx-auto d-block"/>
            </div>
            <div className="container-fluid bg-black">
                <nav id="navbar-main" className={`container navbar navbar-expand-lg bg-black text-white `}
                     style={{fontSize: "18px"}}>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto ">
                            <li className="nav-item">
                                <Link to={"/"}><span className="nav-link pl-5 pr-5">HOME</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link to={{pathname: "/savings/plans", state: {id: "all"}}}>
                                    <span className="nav-link pl-5 pr-5">SAVING PLANS</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/contacts"}><span className="nav-link pl-5 pr-5">ABOUT</span></Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            {links}
                        </ul>
                        {signOut}
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default NavBar;
