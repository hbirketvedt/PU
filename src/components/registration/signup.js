import { useForm} from "react-hook-form";
import {useRef, useState} from "react";
import {useNavigate} from "react-router";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {

    const [ signupMail ] = useState();
    const [ signupPassword ] = useState();

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, signupMail, signupPassword)
    //console.log(signupMail)
    //console.log(signupPassword)

    .then((userCredential) => {
        console.log("Suksess med signup!")
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Mislykket med signup!")
    });

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
            <input ref={signupMail}></input>
            <p>Passord:</p>
            <input ref={signupPassword}></input>
            <p>Bekreft passord:</p>
            <input></input>
            <p></p>

            <button onClick={createUserWithEmailAndPassword(auth, signupMail, signupPassword)}>
                Bekreft
            </button>
        
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