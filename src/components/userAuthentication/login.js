import Navbar from "../navbar/navbar";

import { signInWithGoogle } from "../../firebase_config";


const Login = () => {
  return (
    <div>
      <button className="button" onClick={signInWithGoogle}><i className="fab fa-google"></i>Sign in with google</button>
    </div>
  )
}

export default Login;