import React, { FC } from 'react';
import { Link } from "react-router-dom";
import "./HomePageTheme.css"

const HomePageTheme: FC = () => {
  return (
    <div className="home__cards mt-5">
      {/* <Link to={{ pathname: "/savings/plans" }}> */}
      {/*   <img className="" src="https://i.imgur.com/BMhsxNH.png" alt="Insert here some saving plans image." /> */}
      {/* </Link> */}
      {/* <Link to={{ pathname: "/contacts" }}> */}
      {/*   <img className="" src="https://i.imgur.com/dGM6wB0.png" alt="Insert here some ABOUT image." /> */}
      {/* </Link> */}
    </div >
  );
}

export default HomePageTheme;
