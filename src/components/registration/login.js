import { useForm} from "react-hook-form";
import { useNavigate } from "react-router";
import { auth } from "../../firebase_config";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {

    /*
    const [ input ] = useState();

    const auth = getAuth();


    signInWithEmailAndPassword(auth, email, password)

    .then((userCredential) => {
        console.log("Suksess!")
        const user = userCredential.user;
        // ...
    })

    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Mislykket!")
    }); */
    

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