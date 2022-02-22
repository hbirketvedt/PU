import { useNavigate } from "react-router";



function EditProfile() {
    
    const navigate = useNavigate();
    
    const goToChangeProfilePicture = async () => {
        navigate("/changeProfilePicture")
    }

    const goToChangePassword = async () => {
        navigate("/changePassword")
    }

    const goToChangeBio = async () => {
        navigate("/changeBio")
    }

    const goToDeleteUser = async () => {
        navigate("/deleteUser")
    }

    const goToProfilePage = async () => {
        navigate("/profilePage")
    }

    return(
        <div className="centered" >
            <p></p>
            <div className="test">
                <button type="profile" >
                    Endre profilbilde
                </button>
                <p></p>
                <button type="profile" onClick={goToChangePassword}>
                    Endre passord
                </button>
                <p></p>
                <button type="profile" onClick={goToChangeBio}>
                    Endre bio
                </button>
                <p></p>
                <button type="profile" onClick={goToDeleteUser}>
                    Slett min profil
                </button>
                <p></p>
                <button type="profileCancel" onClick={goToProfilePage}>
                    Avbryt
                </button>
            </div>
        </div>
    )
}

export default EditProfile;