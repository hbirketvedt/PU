import { auth } from "../../firebase_config";
import { getAuth, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router";
import { useState} from "react";
import { set } from "react-hook-form";
import { Alert } from "react-bootstrap";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase_config";
import { getStorage, ref, deleteObject } from "firebase/storage";


function DeleteUser() {

    const user = auth.currentUser
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const storage = getStorage();

    const goToHome = async () => {
        navigate("/splashPage")
    }

    const goToProfilePage = async () => {
        navigate("/profilePage")
    }

    const deleteUser1 = async () => {
        const id = user.uid

        if (window.confirm("Er du sikker på at ønsker å slette brukeren din? Denne handlingen kan ikke angres.")) {
            await deleteDoc(doc(db, "users", id));
            const imageRef = ref(storage, "profilePictures/" + id + ".png");
            deleteObject(imageRef).then(() => {
                    console.log("Profilbildet ble slettet!")
                }).catch((error) => {
                    console.log("Brukeren hadde ikke profilbilde")
                });
            deleteUser(user).then(() => {
                setErrorMessage("")
                goToHome();
              }).catch((error) => {
                setErrorMessage("Brukeren ble ikke slettet, vennligst prøv igjen senere.")
                console.log(error.message)
              });
        } 

    }

    return(
        <div>
            <h1>
                Slett bruker:
            </h1>
            <button type="cancel" onClick={goToProfilePage}>Avbryt</button>
            <button onClick={deleteUser1}>
                Slett bruker
            </button>
            <br></br>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        </div>
    )
}

export default DeleteUser;