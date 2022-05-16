import React, {FC} from 'react';
import {Link} from "react-router-dom";

const HomePageTheme: FC = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-6">
                    <div className="card mb-5" >
                        <Link to={{pathname: "/savings/plans", state: { id: "female" }}}>
                            <img className="img-fluid" src="" alt="Insert here some saving plans image."/>
                        </Link>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card mb-5">
                        <Link to={{pathname: "/contacts", state: { id: "male" }}}>
                            <img className="img-fluid" src="" alt="Insert here some ABOUT image."/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePageTheme;
