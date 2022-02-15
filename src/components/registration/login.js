import { useForm} from "react-hook-form";
import { useNavigate } from "react-router";

function Login() {

    const navigate = useNavigate();

    const goToHome = async () => {
        navigate("/splashPage")
    }
    
    const goToSignup = async () => {
        navigate("/signup")
    } 

    return(
        <div >
            <p>E-post:</p>
            <input></input>
            <p>Passord:</p>
            <input></input>
            <p></p>
            <form onSubmit={goToHome}>
                <button type="submit">
                    Logg inn
                </button>
            </form>
            <form>
                <p> Har du ikke en konto?      
                    <span onClick={goToSignup}>
                        <mark>Registrer deg</mark> 
                    </span>
                </p>
            </form>
        </div>
    )
}

export default Login;