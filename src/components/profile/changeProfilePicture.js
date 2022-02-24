import { onAuthStateChanged, signOut} from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../../firebase_config";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import { useNavigate } from "react-router";


function ChangeProfilePicture() {


    const [user, setUser] = useState({});
    const [photoURL, setPhotoURL] = useState("")
    const [photo, setPhoto] = useState("")

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        handleDownload();
    })
    

    const handleChange = (e) => {
        const etf = e.target.files[0]; 
        /**
         * Checks if etf is not null and a jp(e)g- or a png-file.
         */
        if (etf && (etf.name.includes(".jpeg") || etf.name.includes(".png") || etf.name.includes(".jpg"))) {
            setPhoto(etf);
            const reader = new FileReader();
            reader.onloadend = () => {
                const data = String(reader.result);
                setPhotoURL(data);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }


    const handleDownload = async () => {
        const imageRef = ref(getStorage(), 'profilePictures/' + user.uid + '.png');
        getDownloadURL(imageRef)
            .then((url) => {
                setPhotoURL(url)
            })
            .catch((error) => {
                console.log(error.message)
            });
        }

    const navigate = useNavigate();

    const goToProfilePage = async () => {
        navigate("/profilePage")
    }



    return(
        <div >
            <div>
                <img src={photoURL} alt="Profilbilde" className="avatar2" />
            </div>
            <div className="centered2">
                <input type="file" onChange={handleChange} />
                <button type="save" >Last opp</button>
                <button type="cancel" onClick={goToProfilePage}>Avbryt</button>
            </div>
            <h1>Vi er ikke ferdig med denne siden!!!!</h1>
        </div>
    )
}

export default ChangeProfilePicture;