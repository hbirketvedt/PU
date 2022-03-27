import {useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {auth, db} from "../../firebase_config";
import {signInWithEmailAndPassword} from "firebase/auth";
import {Alert} from "react-bootstrap";
import {collection, getDocs} from "firebase/firestore";

function Login() {

    const [ loginEmail, setLoginEmail ] = useState("");
    const [ loginPassword, setLoginPassword ] = useState("");
    const [ loginError, setLoginError] = useState(""); 

    const location = useLocation();
    const usersCollectionRef = collection(db, "users")

    const login = async () => {
        try {
            setLoginError("");
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

            const data = await getDocs(usersCollectionRef);
            try {
                const dataUser = data.docs.filter(doc => doc.id === user.uid).reduce((a, b) => a);
                console.log("Hei")
                console.log(dataUser)

                //adds to navigate u to where u came from if u where sent to login
                if (location.state?.from) {
                    navigate(location.state.from);
                } else {
                    goToHome();
                } 
            } catch (error) {
                console.log(error)
                console.log("Vi")
                
            }

        } catch (error) {
            console.log(error);
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
        <div className="centered">
            <p>E-post:</p>
            <input onChange={(event) => {setLoginEmail(event.target.value)}}/>
            <p>Passord:</p>
            <input onChange={(event) => {setLoginPassword(event.target.value)}} type="password"/>
            <p></p>
            {loginError && <Alert variant="danger">{loginError}</Alert>}
            <button onClick={login}>
                Logg inn
            </button>
            <form style={{marginTop:"5%"}}>
                <p> Har du ikke en konto?      
                    <span onClick={goToSignup}>
                        <mark>Registrer deg</mark> 
                    </span>
                </p>
            </form>
            <form>   
                <span onClick={goToForgotPassword} >
                    <mark>Glemt passord?</mark> 
                </span>
            </form>
        </div>
    )
}

export default Login;