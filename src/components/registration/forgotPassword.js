import { auth } from "../../firebase_config";
import { sendPasswordResetEmail } from "firebase/auth";
import { Alert } from "react-bootstrap";
import { useState} from "react";
 

function ForgotPassword() {

    const [ email, setEmail ] = useState("");
    const [ confirmedMsg, setConfirmedMsg] = useState(""); 

    const resetPassword = async () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setConfirmedMsg("Hurra!")
        })
        .catch((error) => {
            setConfirmedMsg("Dette gikk ikke!");
            console.log("Dette gikk ikke!")
        })
    }


    return(
        <div>
            <h1>Tilbakestill passord</h1>
            <p>E-post:</p>
            <input onChange={(event) => {setEmail(event.target.value)}}/>
            <p></p>
            <button onClick={resetPassword}>
                Tilbakestill passord
            </button>
            {confirmedMsg && <Alert variant="danger">{confirmedMsg}</Alert>}
        </div>
    )
}

export default ForgotPassword;

