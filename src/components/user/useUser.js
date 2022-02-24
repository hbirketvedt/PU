import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {auth, db} from "../../firebase_config";
import {onAuthStateChanged} from "firebase/auth";



function useUser() {
    const [currentUser, setCurrentUser] = useState({});
    const usersCollectionRef = collection(db, "users")
    const [user, setUser] = useState({})


    useEffect( () => {
        onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser);
            loadUser().then();
        })

        const loadUser = async () => {
            const data = await getDocs(usersCollectionRef);
            console.log("Users polled from database in useUser")
            const user = data.docs.find(doc => doc.id === currentUser.uid);
            console.log(user)
            setUser(user);
        }
    }, []);

    return user;
}

export default useUser;