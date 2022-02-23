import SplashPage from "./components/dummy/splashPage";
import FrontPage from "./components/registration/frontpage";
import {Test} from "./components/user/isUser";


const useAuth = () => {
    //denne delen skal sjekke om en bruker er logget inn eller ikke
    //er den logget inn, return true, else return false
    const currentUser = Test();
    
    //note: caller begge når bare den siste skal returneres (vil printe både fra if og else). uvisst hvorfor. 
    //Gjelder ikke for bare if, så returnerer in the end riktig.
    if (currentUser) {
        return false;
    } else {
        return true;
    }
}

const LoggedInRoutes = () => {
    const isAuth = useAuth();

    //for å navigere rett til en dummy-page, per nå splashpage
    return isAuth ? <FrontPage/> : <SplashPage />; //frontpage if logged in, splash if not
}

export default LoggedInRoutes;