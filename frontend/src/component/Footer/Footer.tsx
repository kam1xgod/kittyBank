import React, { FC } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

import "./Footer.css";

const Footer: FC = () => {
    return (
        <footer className="page-footer p-5 bg-black text-white">
            <div className="container">
                <div className="d-flex justify-content-between">
                    <div className="footer-left">
                        <h3>KittyBank</h3>
                        <p><a href="mailto:kamixtrash@gmail.com">kamixtrash@gmail.com</a></p>
                        <br />
                        <p>Meowww.</p>
                    </div>
                    <div className="footer-right">
                        <h3>Contact me:</h3>
                            <Link to="/github"><span><i className="fab fa-github fa-2x mr-3" style={{ color: "#EF484C" }}></i></span></Link>
                            <Link to="/instagram"><span><i className="fab fa-instagram fa-2x mr-3" style={{ color: "#EF484C" }}></i></span></Link>
                            <Link to="/telegram"><span><i className="fab fa-telegram fa-2x mr-3" style={{ color: "#EF484C" }}></i></span></Link>
                        {/* <a href="/github"> */}
                        {/* </a> */}
                        <p>(please, don't)</p>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <p>©kamixtrash</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer
