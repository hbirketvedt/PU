import { onAuthStateChanged, signOut} from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../../firebase_config";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import { useNavigate } from "react-router";
import {db} from "../../firebase_config";
import {collection, getDocs} from "firebase/firestore";


function ChangeProfilePicture() {

    const navigate = useNavigate();
    const user = auth.currentUser
    const [photoURL, setPhotoURL] = useState("")
    const [photo, setPhoto] = useState("")
    const usersCollectionRef = collection(db, "users")

    useEffect(() => {
            loadUser();
        }, []
    )

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


    const loadUser = async () => {
        const data = await getDocs(usersCollectionRef);
        const currentUser = data.docs.filter(doc => doc.id === user.uid).reduce((a, b) => a).data();
        if (currentUser.profilePictureURL === user.uid) {
            handleDownloadImage();
        } else {
            handleDownloadDefault();
        }

    }

    const handleDownloadImage = async () => {
        const imageRef = ref(getStorage(), 'profilePictures/' + user.uid + '.png');
        getDownloadURL(imageRef)
            .then((url) => {
                setPhotoURL(url)
            })
            .catch((error) => {
                console.log(error.message)
            });
    }

    const handleDownloadDefault = async () => {
        const imageRef = ref(getStorage(), 'profilePictures/' + "default.png");
        getDownloadURL(imageRef)
            .then((url) => {
                setPhotoURL(url)
            })
            .catch((error) => {
                console.log(error.message)
            });
    }

    const goToProfilePage = async () => {
        navigate("/profilePage")
    }

    const save = async () => {
        //...
        navigate("/profilePage")
    }



    return(
        <div >
            <div>
                <img src={photoURL} alt="Profilbilde" className="avatar2" />
            </div>
            <div className="centered2">
                <input type="file" onChange={handleChange} />
                <button type="save" onClick={save}>Last opp</button>
                <button type="cancel" onClick={goToProfilePage}>Avbryt</button>
            </div>
            
        </div>
    )
}

export default ChangeProfilePicture;