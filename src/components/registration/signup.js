import { useForm} from "react-hook-form";
import {useNavigate} from "react-router";

function Signup() {

    const navigate = useNavigate();


    const goToLogin = async () => {
        navigate("/login")
    }

    const goToHome = async () => {
        navigate("/splashPage")
    }

    return(
        <div>
            <p>E-post:</p>
            <input></input>
            <p>Passord:</p>
            <input></input>
            <p>Bekreft passord:</p>
            <input></input>
            <p></p>
            <form onSubmit={goToHome}>
                <button type="submit">
                    Bekreft
                </button>
            </form>
            <p></p>
            <form onSubmit={goToLogin}>
                <button type="submit">
                    Avbryt
                </button>
            </form>
        </div>
    )
}

export default Signup;