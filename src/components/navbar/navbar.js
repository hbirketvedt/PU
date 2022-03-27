import {NavLink} from "react-router-dom";
import { auth } from "../../firebase_config";
import {db} from "../../firebase_config";
import {useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";

function Navbar() {

    const usersCollectionRef = collection(db, "users")
    const [currentUser, setCurrentUser] = useState({});
    const [admin, setAdmin] = useState(false);

    onAuthStateChanged(auth, (currentUser) => {
        setCurrentUser(currentUser);
        if (currentUser) {
            loadUser();
        } else {
            setAdmin(false);
        }
    })

    const loadUser = async () => {
        const data = await getDocs(usersCollectionRef);
        const user = data.docs.filter(doc => doc.id === currentUser.uid).reduce((a, b) => a).data();
        setAdmin(user.admin);
    }


    // Function for NavBar at top of every page. Add new NavLink to add new button to navbar. Must include new route
    // inside router in index.js for newly added NavLink to be functional.
    return (
        <div className={"sticky navbar__wrapper"}>
            <nav>
                <div>
                    <ul>
                        <NavLink to={"/"} id={"home"}>Hjem </NavLink>
                        <NavLink to='/profilePage' id={"profilePage"}>Min Profil</NavLink>
                        <NavLink to='/newRecipe'>Legg ut oppskrift</NavLink>
                        <NavLink to='/oppskrifter'>Oppskrifter</NavLink>
                        {admin && 
                        <NavLink style={{background:"#607b8a"}} to='/users'>Brukere</NavLink>}
                    </ul>
                </div>
            </nav>
        </div>
    )
}



export default Navbar;