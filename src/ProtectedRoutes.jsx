import { Navigate, Outlet } from "react-router";
import {useLocation} from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./components/registration/login";

const auth = getAuth();

/*
    onAuthStateChanged(auth, (user) => {
    if (user !== null) {
        // User is signed in
        const uid = user.uid;
        return true;

    } else {
        // User is signed out
        return false;
    }
    
    });*/


const useAuth = () => {
    //denne delen skal sjekke om en bruker er logget inn eller ikke
    //er den logget inn, return true, else return false
    //koden under funker ikke helt, returner false selv om logget inn
    
    /*
    onAuthStateChanged(auth, (user) => {
    if (user !== null) {
        // User is signed in
        const uid = user.uid;
        return true;

    } else {
        // User is signed out
        return false;
    }
    
    });*/
    return true; //hardkodet for å teste, true=logget inn, false=ikke
}

//courtesy of https://www.youtube.com/watch?v=0x8Dap2EIVE
const ProtectedRoutes = () => {
    const location = useLocation(); //to remember where u came from is redirected
    const isAuth = useAuth();
    //return isAuth ? <Outlet/> : <Login />; //outlet if logged in, signin if not
    return isAuth ? <Outlet/> : <Navigate to='/' replace state={{ from: location}}/>; //alternativ for navigering til siden istedenfor å bare vise loginsiden (med profilepage i url-en)
}

export default ProtectedRoutes;