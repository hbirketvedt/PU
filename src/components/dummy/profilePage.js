import { useForm} from "react-hook-form";
import { useNavigate } from "react-router";

function ProfilePage() {

    const navigate = useNavigate();


    const goToLogin = async () => {
        navigate("../registration/login")
    }

    return(
        <div >
            <div>
                This is a dummy for the profile page
            </div>
            <form
                onSubmit={goToLogin}>
                <button type="submit">
                    Logg ut
                </button>
            </form>
        </div>
    )
}


export default ProfilePage;