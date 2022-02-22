import { Navigate, Outlet } from "react-router";
import {useLocation} from "react-router";
import {Test} from "./components/user/isUser";


const useAuth = () => {
    //denne delen skal sjekke om en bruker er logget inn eller ikke
    //er den logget inn, return true, else return false
    const currentUser = Test();
    
    if (currentUser) {
        return true;
    } else {
        return false;
    }
}

//courtesy of https://www.youtube.com/watch?v=0x8Dap2EIVE
const ProtectedRoutes = () => {
    const location = useLocation(); //to remember where you came from is redirected
    const isAuth = useAuth();
    //for å navigere rett til login-page
    //return isAuth ? <Outlet/> : <Login />; //outlet if logged in, signin if not
    
    //alternativ for navigering til forrige side istedenfor å bare vise loginsiden (med profilepage i url-en)
    return isAuth ? <Outlet/> : <Navigate to='/' replace state={{ from: location}}/>; 
}

export default ProtectedRoutes;