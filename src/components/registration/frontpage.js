import React from 'react';
import {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";


function FrontPage() {
    let navigateLogin = useNavigate();
    const routeChangeLogin = () => {
        let loginPath = 'login';
        navigateLogin(loginPath);
    }
    let navigateSignup = useNavigate();
    const routeChangeSignup = () => {
        let signupPath = 'signup';
        navigateSignup(signupPath);
    }
    return(
        <div>
            <h1>
                Oppskriftshefte
            </h1>
            <h3>
                Spar tid, bruk oppskriftshefte når du handler.
            </h3>
            <button onClick={routeChangeLogin}>
                Logg inn
            </button>
            <button onClick={routeChangeSignup}>
                Opprett konto
            </button>
        </div>
    )
}
export default FrontPage;









