import { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../../firebase_config";
import { onAuthStateChanged, signOut} from "firebase/auth";
import { Alert } from "react-bootstrap";


function ProfilePage() {

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    const logout = async () => {
        await signOut(auth);
        goToLogin();
    }

    const navigate = useNavigate();

    const goToLogin = async () => {
       navigate("../login")
    }

    const deleteUser = async () => {
        navigate("../deleteUser")
    }


    return(
        <div >
            <p>Bruker: {user?.email}</p>
            <p></p>
            <button onClick={logout}>
                Logg ut
            </button>

            <button onClick={deleteUser}>
                Slett bruker
            </button>
            
        </div>
    )
}


export default ProfilePage;