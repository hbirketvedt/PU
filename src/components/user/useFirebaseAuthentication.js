import {useEffect, useState} from "react";
import {auth} from "../../firebase_config";


const useFirebaseAuthentication = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() =>{
       const unlisten = auth.onAuthStateChanged(
          authUser => {
            authUser
              ? setAuthUser(authUser)
              : setAuthUser(null);
          },
       );
       return () => {
           unlisten();
       }
    }, []);

    return authUser
}

export default useFirebaseAuthentication;