import React from 'react';
import { useNavigate } from "react-router-dom";
import image3 from '../../images/logo.png'


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
        <div style={{marginLeft:"30%", marginTop:"8em"}}>
            <img src={image3} style={{width:"60%"}}></img>
            <p></p>
            <div style={{marginLeft:"15%"}}>
                <button onClick={routeChangeLogin}>
                    Logg inn
                </button>
                <button onClick={routeChangeSignup}>
                    Opprett konto
                </button>
            </div>
        </div>
    )
}
export default FrontPage;
