import React from 'react';
import {useNavigate} from "react-router-dom";


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
                Foodies
            </h1>
            <h3>
                Logg inn eller opprett bruker for å legge ut oppskrifter
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
