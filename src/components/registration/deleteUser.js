import { auth } from "../../firebase_config";
import { getAuth, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router";
import { useState} from "react";
import { set } from "react-hook-form";
import { Alert } from "react-bootstrap";


function DeleteUser() {

    const user = auth.currentUser
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');


    const goToHome = async () => {
        navigate("/splashPage")
    }

    const deleteUser1 = () => {
        if (window.confirm("Er du sikker på at ønsker å slette brukeren din? Denne handlingen kan ikke angres.")) {
            deleteUser(user).then(() => {
                setErrorMessage("")
                console.log("Suksess, brukeren er slettet")
                goToHome()
              }).catch((error) => {
                setErrorMessage("Brukeren ble ikke slettet, vennligst prøv igjen senere.")
                console.log("Noe gikk galt, brukeren ble ikke slettet")
              });
        }

    }

    return(
        <div>
            <h1>
                Slett bruker
            </h1>
            <button onClick={deleteUser1}>
                Slett Bruker
            </button>
            <br></br>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        </div>
    )
}

export default DeleteUser;