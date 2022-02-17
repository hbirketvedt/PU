import { useState} from "react";
import { useNavigate } from "react-router";
import { auth } from "../../firebase_config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-bootstrap";

function Login() {

    const [ loginEmail, setLoginEmail ] = useState("");
    const [ loginPassword, setLoginPassword ] = useState("");
    const [ loginError, setLoginError] = useState(""); // bytt navn til loginError

    const login = async () => {
        try {
            setLoginError("");
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user);
            goToHome();
        } catch (error) {
            console.log(error.message);
            if (error.message.includes("auth/invalid-email")) {
                setLoginError("Ugyldig e-post!");
            } else {
                setLoginError("E-post eller passord er er feil!");
            }
        }
    }
    
    const navigate = useNavigate();

    const goToHome = async () => {
        navigate("/splashPage")
    }
    
    const goToSignup = async () => {
        navigate("/signup")
    } 
    const goToForgotPassword = async () => {
        navigate("/forgotPassword")
    } 

    return(
        <div >
            <p>E-post:</p>
            <input onChange={(event) => {setLoginEmail(event.target.value)}}/>
            <p>Passord:</p>
            <input onChange={(event) => {setLoginPassword(event.target.value)}} type="password"/>
            <p></p>
            {loginError && <Alert variant="danger">{loginError}</Alert>}
            <button onClick={login}>
                Logg inn
            </button>
            <form>
                <p> Har du ikke en konto?      
                    <span onClick={goToSignup}>
                        <mark>Registrer deg</mark> 
                    </span>
                </p>
            </form>
            <form>   
                    <span onClick={goToForgotPassword}>
                        <mark>Glemt passord?</mark> 
                    </span>
            </form>
        </div>
    )
}

export default Login;