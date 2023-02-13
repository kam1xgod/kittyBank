import React, { FC } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faInfo, faInfoCircle, faSignInAlt, faSignOutAlt, faUser, faUserPlus, faWallet } from "@fortawesome/free-solid-svg-icons";
import {ReactComponent as LogoSvg} from "../../img/logo.svg"

import { logout } from "../../redux/thunks/auth-thunks";
import "./NavBar.css";
import { AppStateType } from "../../redux/reducers/root-reducer";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { sign } from 'crypto';

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
      <li>
        <Link to={localStorage.getItem("role") === 'ADMIN' ? "/admin" : "/user"}>
          <FontAwesomeIcon className="mr-2" icon={faUser as IconProp} />MY ACCOUNT</Link>
      </li>
    );
signOut = (
  <Link to={"/"} onClick={handleLogout}>
    <FontAwesomeIcon className="mr-2" icon={faSignOutAlt as IconProp} />EXIT
  </Link>
);
  } else {
  links = (
      <>
        <li className="nav-item">
          <Link to={"/login"} className="nav-link pl-5 pr-3">
            <FontAwesomeIcon className="mr-2" icon={faSignInAlt as IconProp} />SIGN IN</Link>
        </li>
        <li className="nav-item">
          <Link to={"/registration"} className="nav-link pl-5 pr-3">
            <FontAwesomeIcon className="mr-2" icon={faUserPlus as IconProp} />SIGN UP</Link>
        </li>
      </>
      );
      signOut = null;
  }

      return (
        <header>
          <LogoSvg className="logo" viewBox="50 50 500 170"/>
          <nav>
            <ul className="nav__links">
              <li>
                <Link to={"/"}><FontAwesomeIcon className="mr-2" icon={faHome as IconProp} />HOME</Link>
              </li>
              <li>
                <Link to={{ pathname: "/savings/plans" }}>
                  <FontAwesomeIcon className="mr-2" icon={faWallet as IconProp} />SAVING PLANS</Link>
              </li>
              <li>
                <Link to={"/contacts"}><FontAwesomeIcon className="mr-2" icon={faInfoCircle as IconProp} />ABOUT</Link>
              </li>
            </ul>
          </nav>
          <ul className="nav__links">
            {links}
            {signOut}
          </ul>
        </header>
      );
};

      export default NavBar;







      /* <div> */
      {/*   <div className="container-fluid bg-black"> */}
      {/*     <nav id="navbar-main" className={`navbar navbar-expand-lg justify-content-between bg-black text-white pt-5`}> */}
      {/*       <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
      {/*         <ul className="navbar-nav"> */}
      {/*           <li className="nav-item"> */}
      {/*             <Link to={"/"}><span className="nav-link pl-4 pr-4"> */}
      {/*               <FontAwesomeIcon className="mr-2" icon={faHome as IconProp} />HOME</span></Link> */}
      {/*           </li> */}
      {/*           <li className="nav-item"> */}
      {/*             <Link to={{ pathname: "/savings/plans" }}> */}
      {/*               <span className="nav-link pl-4 pr-4"> */}
      {/*                 <FontAwesomeIcon className="mr-2" icon={faWallet as IconProp} />SAVING PLANS</span></Link> */}
      {/*           </li> */}
      {/*           <li className="nav-item"> */}
      {/*             <Link to={"/contacts"}><span className="nav-link pl-4 pr-4"> */}
      {/*               <FontAwesomeIcon className="mr-2" icon={faInfoCircle as IconProp} />ABOUT</span></Link> */}
      {/*           </li> */}
      {/*         </ul> */}
      {/*         <ul className="navbar-nav ml-auto"> */}
      {/*           {links} */}
      {/*         </ul> */}
      {/*         {signOut} */}
      {/*       </div> */}
      {/*     </nav> */}
      {/*   </div> */}
      {/*   <div id="header" className="container-fluid header-top d-none d-md-block"> */}
      {/*     <img src="https://i.imgur.com/i4y7Alt.png" className="mx-auto d-block" /> */}
      {/*   </div> */}
      {/* </div> */}
