import React, {FC} from 'react';

import "./Footer.css";

// todo: https://reactgo.com/react-redirect-to-external-url/ - how you can make external URLs.

const Footer: FC = () => {
    return (
        <footer className="page-footer p-5 bg-black text-white">
            <div className="container">
                <div className="d-flex justify-content-between">
                    <div className="footer-left">
                        <h3>CUMyBank</h3>
                        <p><a href="mailto:kamixtrash@gmail.com">kamixtrash@gmail.com</a></p>
                        <br/>
                        <p>Crypto Universal Money Bank</p>
                    </div>
                    <div className="footer-right">
                        <h3>Contact me:</h3>
                        <a href="www.google.com">
                            <i className="fab fa-instagram fa-2x mr-3" style={{color: "white"}}></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-telegram fa-2x mr-3" style={{color: "white"}}></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-github fa-2x mr-3" style={{color: "white"}}></i>
                        </a>
                        <p>(please, don't)</p>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center"}}>
                    <p>©kamixtrash</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer
