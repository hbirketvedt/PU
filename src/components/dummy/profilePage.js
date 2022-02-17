import { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../../firebase_config";
import { onAuthStateChanged, signOut} from "firebase/auth";

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
        navigate("../registration/login")
    }

    

    return(
        <div >
            <p>Bruker: {user?.email}</p>
            <p></p>
            <button onClick={logout}>
                Logg ut
            </button>
            
        </div>
    )
}


export default ProfilePage;