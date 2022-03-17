import {useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../firebase_config";

export function Test() {

        const [currentUser, setCurrentUser] = useState({});


        onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser);
        })
        return( currentUser )
    }
